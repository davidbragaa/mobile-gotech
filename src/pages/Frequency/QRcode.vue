<template>
  <q-page class="flex flex-center">
    <div class="col-12 text-center">
      <qrcode-vue :value="QRValue" size="300" level="H"/>
        <form>
          <q-space />
          <input
            type="text"
            v-model="QRValue"
<<<<<<< HEAD
            :to="columnsDisciplinas"
=======
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
          >
        </form>
    </div>
  </q-page>
</template>

<script>

import QrcodeVue from 'qrcode.vue'
<<<<<<< HEAD
import { columnsDisciplinas } from '../Disciplina/table'
=======
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e

export default {
  data () {
    return {
<<<<<<< HEAD
      QRValue: null,
      columnsDisciplinas
=======
      QRValue: null
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e

    }
  },
  components: {
    QrcodeVue
  }
}
</script>
