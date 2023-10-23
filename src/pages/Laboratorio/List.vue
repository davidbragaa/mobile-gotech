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

        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <div class="q-pa-sm">
              <div class="q-mb-xs">
                  {{ date.now }}

              </div>
                <q-btn
                  icon="mdi-calendar-edit"
                  round color="secondary"
                  dense size="sm"
                  >
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
        </q-td>
       </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { columnsLaboratorios } from './table'
import { now } from 'lodash'

export default defineComponent({

  name: 'PageLaboratorioList',
  setup () {
    const laboratorio = ref([])
    const loading = ref(true)
    const table = 'Laboratorio'

    const { list } = useApi()
    const { notifyError } = useNotify()

    const date = ref([now])
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

    onMounted(() => {
      handleListLaboratorio()
    })

    return {
      columnsLaboratorios,
      laboratorio,
      loading,
      date,
      proxyDate,
      selectedDate: null

    }
  }

})
</script>
