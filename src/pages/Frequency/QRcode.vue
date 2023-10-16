<template>
  <q-page padding>
    <div class="row justify-center q-gutter-y-sm">
      <q-input
        v-model="disciplinaId"
        label="ID da disciplina"
        lazy-rules=""
        color="secondary"
      />

      <q-btn
        label="Gerar QrCode"
        color="secondary"
        icon="mdi-qrcode"
        @click="buscarDisciplina"
      />
      <div v-if="disciplinaEncontrada">
        <h2>Detalhes da Disciplina</h2>
        <p>ID: {{ disciplinaEncontrada.id }}</p>
        <p>Nome: {{ disciplinaEncontrada.nome }}</p>
        <!-- Outros detalhes da disciplina -->
        <div>
          <qrcode-vue :value="qrCodeValue" :size="200"></qrcode-vue>
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
    const disciplinaId = ref('')
    const disciplinaEncontrada = ref(null)
    const qrCodeValue = ref('') // Defina qrCodeValue como uma referência no setup

    const buscarDisciplina = async () => {
      try {
        const api = useApi()
        const disciplina = await api.getById('disciplinas', disciplinaId.value)
        disciplinaEncontrada.value = disciplina

        // Após encontrar a disciplina, chame o método para gerar o QR Code
        gerarQrCode()
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error)
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
      disciplinaId,
      disciplinaEncontrada,
      qrCodeValue,
      buscarDisciplina
    }
  }
}
</script>
