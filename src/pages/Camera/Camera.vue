<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text center">
        <video autoplay width="250rem" ref="videoplay"></video>
      </div>
    </div>
    <div class="col-12 text-center">
      <q-btn
        v-if="!cameraStart"
        label="Acessar a Camera"
        color="secondary"
        icon="mdi-camera-iris"
        @click="captureImage"
      />
      <img :src="imageSrc">

    </div>
  </q-page>
</template>

<script>

import { Camera, CameraResultType } from '@capacitor/camera'
// import { capacitor } from '@capacitor/core'
import { ref } from 'vue'
import axios from 'axios'
// import { useQuasar } from 'quasar'

export default {

  name: 'PageCamera',

  setup () {
    const imageSrc = ref('')

    const isWeb = process.env.VUE_APP_PLATFORM === 'web'

    async function captureImage () {
      if (isWeb) {
        // Tratar o caso em que o aplicativo está rodando em um ambiente web.
        console.error('A câmera não está disponível no ambiente web.')
        return
      }
      const image = await Camera.getPicture({
        video: true,
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri

        // The result will vary on the value of the resultType option.
        // CameraResultType.Uri - Get the result from image.webPath
        // CameraResultType.Base64 - Get the result from image.base64String
        // CameraResultType.DataUrl - Get the result from image.dataUrl
      })
      imageSrc.value = image.webPath
    }

    return {
      imageSrc,
      captureImage
      // capacitor
    }
  },
  methods: {
    async registrarPresenca () {
      try {
        // Decodifique o valor do código QR (no seu caso, você pode fazer isso na parte do servidor)
        const decodedValue = JSON.parse(this.value)

        // Envie os dados para o servidor para registrar a presença
        await axios.post('/registrar-presenca', decodedValue)

        // Registro de presença bem-sucedido
        alert('Presença registrada com sucesso!')
      } catch (error) {
        console.error('Erro ao registrar presença:', error)
        alert('Erro ao registrar presença. Tente novamente.')
      }
    }
  },
  mounted () {
    // Chame o método registrarPresenca quando o código QR for escaneado
    this.registrarPresenca()
  }
}

</script>
