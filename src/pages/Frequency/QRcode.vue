<template>
  <q-page class="flex flex-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
      <q-select
        standout
        label="Disciplinas"
        v-model="selectedDisciplinas"
        dense
        :options="disciplinas"
      />
      <q-btn
        label="Gerar QrCode"
        color="secondary"
        icon="mdi-qrcode"
        @click="buscarDisciplina"
      />
      <div v-if="disciplinaEncontrada">
        <h6>Detalhes da Disciplina</h6>
        <p>ID: {{ disciplinaEncontrada.id }}</p>
        <p>Nome: {{ disciplinaEncontrada.nome }}</p>
        <!-- Outros detalhes da disciplina -->
        <div>
          <qrcode-vue :value="qrCodeValue" :size="90"></qrcode-vue>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import useApi from 'src/composables/UseApi'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  setup () {
    const selectedDisciplina = ref('')
    const disciplinaEncontrada = ref(null)
    const qrCodeValue = ref('')

    const disciplinas = ref([]) // Array para armazenar as disciplinas vindas da API

    // Utilize sua função da API para buscar as disciplinas e preencher o array
    const fetchDisciplinas = async () => {
      try {
        const api = useApi()
        const response = await api.getById('disciplinas', this.disciplinasId) // Use a função adequada da API para buscar as disciplinas
        disciplinas.value = response.data // Suponha que o retorno da API é um array de disciplinas
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error.message)
      }
    }

    // Chame a função para buscar as disciplinas quando o componente for montado
    fetchDisciplinas()

    const buscarDisciplina = async () => {
      try {
        const api = useApi()
        const nomeDisciplinas = selectedDisciplina
        const disciplinas = await api.getDisciplinasPorNome(nomeDisciplinas)
        disciplinaEncontrada.value = disciplinas

        // Após encontrar a disciplina, chame o método para gerar o QR Code
        gerarQrCode()
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error.message)
      }
    }

    const gerarQrCode = () => {
      // Verifique se a disciplina foi encontrada antes de gerar o QR code
      if (disciplinaEncontrada.value) {
        // Crie uma string com os dados desejados, incluindo a data e hora da captura
        const dataHoraCaptura = new Date().toLocaleString()
        const qrCodeData = `ID: ${disciplinaEncontrada.value.id}\nNome: ${disciplinaEncontrada.value.nome}\nCapturado em: ${dataHoraCaptura}`

        // Atribua a string ao valor do QR code
        qrCodeValue.value = qrCodeData
      }
    }

    return {
      disciplinaId: '',
      selectedDisciplina,
      disciplinaEncontrada,
      qrCodeValue,
      buscarDisciplina,
      disciplinas
    }
  }
}
</script>
