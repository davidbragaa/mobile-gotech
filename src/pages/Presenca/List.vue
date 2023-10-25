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
          <span class="text-h6">Alunos</span>
          <q-space />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <div>
              <q-checkbox
                v-model="props.row.presente"
                color="green"
                @click="handlePresencaChange(props.row)"
              >
                <q-tooltip>
                  Presença
                </q-tooltip>
              </q-checkbox>
              <q-checkbox
                v-model="props.row.falso"
                color="red"
                @click="handleFaltaChange(props.row)"
              >
                <q-tooltip>
                  Falta
                </q-tooltip>
              </q-checkbox>
            </div>
            <!-- <q-select
              v-model="props.row.manualOption"
              :options="['', 'Presente', 'Falta']"
            /> -->
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
import { columnsAlunos } from './table'

export default defineComponent({
  name: 'PagePresencaList',
  setup () {
    const aluno = ref([])
    const loading = ref(true)
    const table = 'Aluno'

    const { list } = useApi()
    const { notifyError } = useNotify()

    const handleListAluno = async () => {
      try {
        loading.value = true
        aluno.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handlePresencaChange = (selectedAluno) => {
      selectedAluno.manualOption = 'Presente'
      selectedAluno.falso = false
    }

    const handleFaltaChange = (selectedAluno) => {
      selectedAluno.manualOption = 'Falta'
      selectedAluno.presente = false
    }

    onMounted(() => {
      handleListAluno()
    })

    return {
      columnsAlunos,
      aluno,
      loading,
      handlePresencaChange,
      handleFaltaChange
    }
  }
})
</script>
