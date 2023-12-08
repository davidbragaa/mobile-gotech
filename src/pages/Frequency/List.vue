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
            Frequência
          </span>
            <q-space />
        </template>
          <template>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-checkbox dense v-model="red" label="Red" color="red" />
                  <q-checkbox dense v-model="cyan" label="Cyan" color="cyan" />
                </div>
              </div>
            </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
      <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      >
      </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsAlunos } from '../Aluno/table'

export default defineComponent({

  name: 'PageFrequenciaList',
  setup () {
    const aluno = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'Aluno'
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListFrequencia = async () => {
      try {
        loading.value = true
        aluno.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (aluno) => {
      router.push({ name: 'form-frequencia', params: { id: aluno.id } })
    }

    const handleRemoveFrequencia = async (aluno) => {
      try {
        $q.dialog({
          title: 'Atenção',
          message: `Você está certo de remover a presença do ${aluno.nome} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, aluno.value.id)
          notifySuccess('Delete com sucesso')
          handleListFrequencia()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListFrequencia()
    })

    return {
      columnsAlunos,
      aluno,
      loading,
      handleEdit,
      handleRemoveFrequencia
      // teal: ref(true),
      // orange: ref(true),
      // red: ref(true),
      // cyan: ref(false)

    }
  }

})
</script>
