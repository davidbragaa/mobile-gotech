<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text-center">
        <video autoplay width="250rem" ref="videoplay"></video>
      </div>
    </div>
    <div class="col-12 text-center">
      <q-btn
        v-if="!cameraStart"
        label="Acessar a Câmera"
        color="secondary"
        icon="mdi-camera-iris"
        @click="openCamera"
      />
      <img :src="imageSrc">
    </div>
  </q-page>
</template>

<script>
import { Camera, CameraResultType } from '@capacitor/camera'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import useNotify from 'src/composables/UseNotify'

export default {
  name: 'PageCamera',

  setup () {
    const imageSrc = ref('')
    const cameraStart = ref(false)
    const { notifyError, notifySuccess } = useNotify() // Certifique-se de que o UseNotify esteja configurado

    const openCamera = async () => {
      try {
        cameraStart.value = true
        const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri
        })

        imageSrc.value = image.webPath
        emitNotification() // Emita a notificação após a imagem ser capturada
      } catch (error) {
        notifyError(error.message)
      } finally {
        cameraStart.value = false
      }
    }

    const emitNotification = () => {
      try {
        // Envie a notificação de presença realizada
        notifySuccess('Presença realizada', 'Sua presença na aula foi registrada com sucesso.')
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      // Chame o método openCamera ao montar a página, se necessário
    })

    const registrarPresenca = async () => {
      try {
        // Aqui você pode usar a imagem capturada (imageSrc) ou qualquer outro dado necessário
        // Envie os dados para o servidor para registrar a presença
        await axios.post('/registrar-presenca', { image: imageSrc.value })

        // Registro de presença bem-sucedido
        notifySuccess('Presença registrada com sucesso!')
      } catch (error) {
        notifyError(error.message)
        alert('Erro ao registrar presença. Tente novamente.')
      }
    }

    return {
      imageSrc,
      openCamera,
      cameraStart,
      registrarPresenca
    }
  }
}
</script>
