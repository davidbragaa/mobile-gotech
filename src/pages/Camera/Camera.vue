<template>
  <q-page padding>
    <div class="row justify-center q-gutter-pt-sm">
      <div v-if="!showCamera" class="col-12 text-center q-pt-md">
          <img
            alt="QrCode"
            src="~assets/QRcode.svg"
            style="width: 340px"
          >
      </div>
    </div>
    <div class="full-width q-pt-xs">
       <div class="col-12 text-center">
        <span class="text-subtitle2 text-grey-9">
          {{ textInfo }}
        </span>
        <div class="full-width q-pt-xs">
          <q-btn
            :label="isUpdate ? 'Atualizar' : 'Fazer Checkin'"
            color="secondary"
            icon="mdi-camera-iris"
            class="full-width"
            outline
            rounded
            size="lg"
            @click="turnCameraOn()"
            v-show="!showCamera"
          />
        </div>
          <p class="text-subtitle1" v-if="result">Dados: <b>{{ result[0].rawValue }}</b></p>
          <div class="qr-code-boundary" v-if="showCamera">
            <qrcode-stream :camera="camera" @detect="onDecode">
            </qrcode-stream>
          </div>
          <q-btn
                label="Confirmar Checkin"
                color="secondary"
                class="q-mt-md"
                flat
                @click="save"
                v-close-popup
              />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'PageCamera',
  components: { QrcodeStream },
  setup () {
    const table = 'Frequencia'
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const route = useRoute()
    const { post, update } = useApi()

    const isUpdate = computed(() => route.params.id)

    // const isValid = ref(undefined)
    const camera = ref('auto')
    const result = ref(null)
    const showCamera = ref(false)

    // const textInfo = ref('')
    const freq = ref(null)

    const turnCameraOn = () => {
      camera.value = 'auto'
      showCamera.value = true
    }

    const turnCameraOff = () => {
      camera.value = 'off'
      showCamera.value = false
    }

    const onDecode = async (content) => {
      result.value = content
      freq.value = {
        data: content[0].rawValue.data,
        hora: content[0].rawValue.hora,
        presente: 'SIM',
        id: content[0].rawValue
      }
      turnCameraOff()
    }

    onMounted(() => {
      if (isUpdate.value) {
        onDecode(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, freq.value)
          notifySuccess('Atualizado com Sucesso')
        } else {
          await post(table, freq.value)
          notifyError('Salvo com Sucesso')
        }

        router.push({ name: 'camera' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      // isValid,
      camera,
      result,
      showCamera,
      // textInfo,
      isUpdate,
      freq,
      turnCameraOn,
      turnCameraOff,
      onDecode,
      handleSubmit
    }
  }
}
</script>
