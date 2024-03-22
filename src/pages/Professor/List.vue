<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="professor"
        :columns="columnsProfessor"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Professor
          </span>
            <q-space />
            <q-btn
              v-if="$q.platform.is.desktop"
              label="Adicionar"
              color="secondary"
              icon="mdi-plus"
              dense
              rounded
              :to="{ name: 'form-professor' }"
              />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td
            :props="props"
            class="q-gutter-x-sm"
          >

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
              @click="handleRemoveProfessor(props.row)"
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
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          v-if="$q.platform.is.mobile"
          fab
          icon="mdi-plus"
          color="secondary"
          dense size="xs"
          :to="{ name: 'form-professor' }"
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
import { columnsProfessor } from './table'

export default defineComponent({

  name: 'PageProfessorList',
  setup () {
    const professor = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'Professor'
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListProfessor = async () => {
      try {
        loading.value = true
        professor.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (professor) => {
      router.push({ name: 'form-professor', params: { id: professor.id } })
    }

    const handleRemoveProfessor = async (professor) => {
      try {
        $q.dialog({
          title: 'Atenção',
          message: `Você está certo de apagar ${professor.nome} da lista?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, professor.value.id)
          notifySuccess('Delete com sucesso')
          handleListProfessor()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListProfessor()
    })

    return {
      columnsProfessor,
      professor,
      loading,
      handleEdit,
      handleRemoveProfessor

    }
  }

})
</script>
