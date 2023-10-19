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
            Frequencia
          </span>
            <q-space />
            <q-btn
              v-if="$q.platform.is.desktop"
              label="Adicionar"
              color="secondary"
              icon="mdi-plus"
              dense
              :to="{ name: 'form-frequencia' }"
              />
        </template>
          <template>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-checkbox dense v-model="red" label="Red" color="red" />
                  <q-checkbox dense v-model="cyan" label="Cyan" color="cyan" />
                </div>
              </div>
            </template>
          <template v-slot:body-cell-img_url="props">
            <q-td :props="props">
              <q-avatar v-if="props.row.img_url">
                <img src="props.row.img_url">
              </q-avatar>
              <q-avatar v-else color="gray" text-color="white" icon="mdi-image-off" />
            </q-td>
          </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleListFrequencia(props.row)">
              <q-tooltip>
                Remove
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
        <q-btn
          v-if="$q.platform.is.mobile"
          fab
          icon="mdi-plus"
          color="secondary"
          :to="{ name: 'form-frequencia' }"
         />
      </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useAuthUser from 'src/composables/UseAuthUser'
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
    const { user } = useAuthUser
    const { notifyError, notifySuccess } = useNotify()

    const handleListFrequencia = async () => {
      try {
        loading.value = true
        aluno.value = await list(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (aluno) => {
      router.push({ name: 'form-aluno', params: { id: aluno.value.id } })
    }

    const handleRemoveFrequencia = async (Aluno) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Você etsá certo de deletar ${aluno.value.nome} ?`,
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
      handleRemoveFrequencia,
      teal: ref(true),
      orange: ref(true),
      red: ref(true),
      cyan: ref(false)

    }
  }

})
</script>
