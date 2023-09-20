<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="disciplina"
        :columns="columnsDisciplinas"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Disciplina
          </span>
            <q-space />
            <q-select
            standout
            v-model = "modelo"
            dense
            :options =  "opções"
            />

        </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <q-btn
                color="primary"
                label=""
                dense
                @click="useCamera"
                icon="mdi-camera"
                />
            </q-td>
            <div  class = " q-gutter-sm " >

            </div >
          </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
// import { useRouter } from 'vue-router'
// import { useQuasar } from 'quasar'
import { columnsDisciplinas } from './table'

export default defineComponent({

  name: 'PageDisciplinaList',
  setup () {
    const disciplina = ref([])
    const loading = ref(true)
    // const router = useRouter()
    const table = 'Disciplina'
    // const $q = useQuasar()

    const { list } = useApi()
    const { notifyError } = useNotify()

    const handleListDisciplina = async () => {
      try {
        loading.value = true
        disciplina.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListDisciplina()
    })

    return {
      columnsDisciplinas,
      disciplina,
      loading,
      // handleEdit,
      // handleRemoveDisciplina,
      modelo: ref(null),
      opções: [
        'Administração',
        'Desenvolvimento de Sistemas',
        'Informática',
        'Logística',
        'Recursos Humanos',
        'Segurança do Trabalho'
      ]

    }
  }

})
</script>
