<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="frequencia"
        :columns="columnsFrequencia"
        rwo-key="id"
        class-col-12
        :loading="loading"
        flat bordered
        grid
        >
        <template v-slot:top>
            <span class="text-h6">
              Frequencia
            </span>
            <q-space/>
          </template>
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
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
          icon="md-plus"
          color="secondary"
          :to="{ name: 'form-frequencia' }"
          />
      </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { columnsFrequencia } from './table'

export default defineComponent({

  name: 'PageFrequenciaPublic',
  setup () {
    const frequencia = ref([])
    const loading = ref(true)
    const table = 'Frequencia'

    const { listPublic } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()

    const handleListFrequencia = async (userId) => {
      try {
        loading.value = true
        frequencia.value = await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        handleListFrequencia(route.params.id)
      }
    })

    return {
      columnsFrequencia,
      frequencia,
      loading
    }
  }
})
</script>
