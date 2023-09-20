<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="laboratorio"
        :columns="columnsLaboratorios"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Laboratório
          </span>
            <q-space />
            <!-- <q-btn
              v-if="$q.platform.is.desktop"
              label="Adicionar"
              color="secondary"
              icon="mdi-plus"
              dense
              :to="{ name: 'form-laboratorio' }"
              /> -->

        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <div class="q-pa-md">
              <div class="q-mb-sm">
                <q-badge
                  color="primary"
                  dense
                >
                  {{ date }}
                </q-badge>
              </div>
                <q-btn icon="event" round color="secondary">
                  <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="proxyDate">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          color="secondary"
                          flat v-close-popup
                        />

                        <q-btn
                          label="OK"
                          color="secondary"
                          flat @click="save"
                          v-close-popup
                        />

                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
          </div>

            <!-- <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveAluno(props.row)">
              <q-tooltip>
                Remove
              </q-tooltip>
            </q-btn> -->
          </q-td>

        </template>
      </q-table>
    </div>
      <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      >
        <!-- <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="secondary"
        :to="{ name: 'form-laboratorio' }" /> -->
      </q-page-sticky>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsLaboratorios } from './table'
import { now } from 'lodash'

export default defineComponent({

  name: 'PageLaboratorioList',
  setup () {
    const laboratorio = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'Laboratorio'
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const date = ref([])
    const proxyDate = ref([now])

    const handleListLaboratorio = async () => {
      try {
        loading.value = true
        laboratorio.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (laboratorio) => {
      router.push({ name: 'form-laboratorio', params: { id: laboratorio.id } })
    }

    const handleRemoveLaboratorio = async (laboratorio) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Você está certo de deletar ${laboratorio.value.nome} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, laboratorio.value.id)
          notifySuccess('Delete com sucesso')
          handleListLaboratorio()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListLaboratorio()
    })

    return {
      columnsLaboratorios,
      laboratorio,
      loading,
      handleEdit,
      handleRemoveLaboratorio,
      date,
      proxyDate

      //   updateProxy () {
      //     proxyDate.value = date.value
      // },

      // save () {
      //   date.value = proxyDate.value
      // }

    }
  }

})
</script>
