<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text center">
        <!-- <video autoplay width="250rem" ref="videoplay"></video> -->
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
import { ref } from 'vue'

export default {

  name: 'PageCamera',

  setup () {
    const imageSrc = ref('')

    async function captureImage () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      })

      // The result will vary on the value of the resultType option.
      // CameraResultType.Uri - Get the result from image.webPath
      // CameraResultType.Base64 - Get the result from image.base64String
      // CameraResultType.DataUrl - Get the result from image.dataUrl
      imageSrc.value = image.webPath
    }

    return {
      imageSrc,
      captureImage
    }
  }
}

</script>
