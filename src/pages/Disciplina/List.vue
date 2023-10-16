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
            <option disabled value="true" color="primary">Escolha o Curso</option>
              <q-select
              standout
              label= "Curso"
              v-model="selectedCurso"
              dense
              :options= "opções"
              />
              <!-- Adicione uma coluna para exibir o QR code -->
        </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
                <qrcode-vue
                :value="getQrCodeValue(props.row)"
                dense
                :size="90"
                />
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
import { columnsDisciplinas } from './table'
import QrcodeVue from 'qrcode.vue'

export default defineComponent({

  name: 'PageDisciplinaList',
  components: {
    QrcodeVue
  },
  setup () {
    const disciplina = ref([])
    const loading = ref(true)
    const table = 'Disciplina'
    const { list } = useApi()
    const { notifyError } = useNotify()
    const selectedCurso = ref(null)

    const handleListDisciplina = async () => {
      try {
        loading.value = true
        if (selectedCurso.value) {
          // Se um curso foi selecionado, filtre as disciplinas com base no curso
          disciplina.value = await list(table, { curso: selectedCurso.value })
        } else {
          // Caso contrário, liste todas as disciplinas
          disciplina.value = await list(table)
        }
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }
    onMounted(() => {
      handleListDisciplina(selectedCurso)
    })

    // Função para gerar o valor do QR code com base no ID da disciplina
    const getQrCodeValue = (disciplinaId) => {
      const qrData = {
        disciplinaId: disciplina.value.id,
        checkinCode: generateCheckinCode() // Gere um código de check-in único
      }
      return JSON.stringify(qrData)
    }

    const generateCheckinCode = () => {
      // Aqui você pode gerar um código de check-in único, por exemplo, usando um UUID ou outra lógica personalizada
      return 'código-de-checkin-único'
    }

    const opções = [
      'Administração',
      'Desenvolvimento de Sistemas',
      'Informática',
      'Logística',
      'Recursos Humanos',
      'Segurança do Trabalho'
    ]

    return {
      columnsDisciplinas,
      selectedCurso,
      disciplina,
      loading,
      opções,
      getQrCodeValue // Tornar a função disponível no modelo do componente

    }
  }
})
</script>
