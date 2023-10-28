<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="historico"
        :columns="columnsHistorico"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Histórico Acadêmico
          </span>
            <q-space />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { columnsHistorico } from './table'

export default defineComponent({

  name: 'PageHistoricoList',
  setup () {
    const historico = ref([])
    const loading = ref(true)
    const table = 'Historico'

    const { list } = useApi()
    const { notifyError } = useNotify()

    const handleListHistorico = async () => {
      try {
        loading.value = true
        historico.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListHistorico()
    })

    return {
      columnsHistorico,
      historico,
      loading

    }
  }

})
</script>
