<template>
  <q-page class="flex flex-center">
    <div class="col-12 text-center">
      <qrcode-vue :value="QRValue" size="300" level="H"/>
        <form>
          <q-space />
          <input
            type="text"
            v-model="QRValue"
            :to="columnsDisciplinas"
          >
        </form>
    </div>
  </q-page>
</template>

<script>

import QrcodeVue from 'qrcode.vue'
import { columnsDisciplinas } from '../Disciplina/table'

export default {
  data () {
    return {
      QRValue: null,
      columnsDisciplinas

    }
  },
  components: {
    QrcodeVue
  }
}
</script>
