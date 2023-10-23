<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="aluno"
        :columns="columnsAlunos"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Alunos
          </span>
            <q-space />
            <q-btn
              v-if="$q.platform.is.desktop"
              label="Adicionar"
              color="secondary"
              icon="mdi-plus"
              dense
              :to="{ name: 'form-aluno' }"
              />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense size="xs"
              @click="handleEdit(props.row)"
              >
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense size="xs"
              @click="handleRemoveAluno(props.row)"
              >
              <q-tooltip>
                Remove
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
      <q-page-sticky
        position="bottom-left"
        :offset="[15, 10]"
      >
        <q-btn
          v-if="$q.platform.is.mobile"
          fab
          icon="mdi-plus"
          color="secondary"
          :to="{ name: 'form-aluno' }"
        />
      </q-page-sticky>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsAlunos } from './table'

export default defineComponent({

  name: 'PageAlunoList',
  setup () {
    const aluno = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'Aluno'
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListAluno = async () => {
      try {
        loading.value = true
        aluno.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (aluno) => {
      router.push({ name: 'form-aluno', params: { id: aluno.id } })
    }

    const handleRemoveAluno = async (aluno) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Você está certo de deletar ${aluno.value.nome} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, aluno.value.id)
          notifySuccess('Delete com sucesso')
          handleListAluno()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListAluno()
    })

    return {
      columnsAlunos,
      aluno,
      loading,
      handleEdit,
      handleRemoveAluno

    }
  }

})
</script>
