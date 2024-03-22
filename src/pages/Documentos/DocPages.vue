<template>
  <q-page padding>
    <div class="row justify-center q-gutter-pt-sm">
      <div class="col-12 text-center q-pt-md">
        <img
          alt="Envio"
          src="~assets/envio.png"
          style="width: 300px"
        >
      </div>
    </div>
    <div class="full-width text-center q-pt-xs">
      <q-btn
        label="Selecionar Arquivo"
        color="secondary"
        icon="mdi-file"
        outline
        rounded
        size="md"
        @click="selectFile"
      />
      <q-btn
        label="Capturar da Câmera"
        color="secondary"
        icon="mdi-camera-iris"
        outline
        rounded
        size="md"
        @click="captureFromCamera"
      />
    </div>
    <div class="qr-code-boundary" v-if="showCamera">
      <video ref="videoElement" autoplay style="width: 100%; max-width: 400px;"></video>
      <q-btn
        label="Capturar Imagem"
        color="secondary"
        class="q-mt-md"
        flat
        @click="captureImage"
      />
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FileUploadPage',
  setup () {
    const showCamera = ref(false)
    const videoElement = ref(null)
    let mediaStream = null

    const selectFile = () => {
      // Lógica para seleção de arquivo
    }

    const captureFromCamera = async () => {
      showCamera.value = true
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoElement.value) {
          videoElement.value.srcObject = mediaStream
        }
      } catch (error) {
        console.error('Erro ao acessar a câmera:', error)
      }
    }

    const captureImage = () => {
      const video = videoElement.value
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageDataURL = canvas.toDataURL('image/jpeg')
      console.log('Imagem capturada:', imageDataURL)

      // Aqui você pode fazer algo com a imagem capturada
      // Por exemplo, enviar para o Supabase ou realizar outra ação necessária

      stopCamera()
      showCamera.value = false
    }

    const stopCamera = () => {
      if (mediaStream) {
        const tracks = mediaStream.getTracks()
        tracks.forEach((track) => {
          track.stop()
        })
      }
    }

    return {
      showCamera,
      videoElement,
      selectFile,
      captureFromCamera,
      captureImage
    }
  }
}
</script>
