<template>
  <q-page class="flex flex-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <span class="text-h6">
            Disciplinas
        </span>
          <q-space />
            <q-select
              standout
              label= "Curso"
              v-model="selectedCurso"
              dense
              :options= "opções"
            />
            <q-select
              standout
              label="Disciplinas"
              v-model="selectedDisciplina"
              dense
              :options="disciplinas"
              option-label="nome"
            />
            <q-btn
              label="Gerar QrCode"
              color="secondary"
              icon="mdi-qrcode"
              @click="gerarQrCode"
            />
        <div v-if="selectedDisciplina">
          <h6>Detalhes da Disciplina</h6>
          <p>Nome: {{ selectedDisciplina.nome }}</p>
          <!-- Outros detalhes da disciplina -->
        <div>
          <qrcode-vue :value="qrCodeValue" :size="150"></qrcode-vue>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import QrcodeVue from 'qrcode.vue'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  components: {
    QrcodeVue
  },
  setup () {
    const selectedDisciplina = ref('')
    const qrCodeValue = ref('')
    const disciplinas = ref([])
    const { notifyError } = useNotify()
    const table = 'Disciplinas'
    const loading = ref(true)
    const selectedCurso = ref(null)

    const { list } = useApi() // Mova a instância da API para fora das funções para reutilização

    const fetchDisciplinas = async () => {
      try {
        loading.value = true
        if (selectedCurso.value) {
          // Se um curso foi selecionado, filtre as disciplinas com base no curso
          disciplinas.value = await list(table, { curso: selectedCurso.value })
        } else {
          // Caso contrário, liste todas as disciplinas
          disciplinas.value = await list(table)
        }
        loading.value = false
        // gerarQrCode()
      } catch (error) {
        notifyError(error.message)
      }
    }

    const gerarQrCode = () => {
      if (selectedDisciplina.value) {
        const dataHoraCaptura = new Date().toLocaleString()
        const qrCodeData = `ID: ${selectedDisciplina.value.id}\nNome: ${selectedDisciplina.value.nome}\nCapturado em: ${dataHoraCaptura}`
        qrCodeValue.value = qrCodeData
      }
    }

    onMounted(() => {
      // Chame a função para buscar as disciplinas quando o componente for montado
      fetchDisciplinas()
    })

    const opções = [
      'Administração',
      'Desenvolvimento de Sistemas',
      'Informática',
      'Logística',
      'Recursos Humanos',
      'Segurança do Trabalho'
    ]

    return {
      selectedDisciplina,
      selectedCurso,
      qrCodeValue,
      gerarQrCode,
      // buscarDisciplina,
      disciplinas,
      opções
    }
  }
})
</script>
