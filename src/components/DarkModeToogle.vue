<template>
  <div>
    <q-toggle
      v-model="darkMode"
      checked-icon="mdi-weather-night"
      color="blue"
      unchecked-icon="mdi-white-balance-sunny"
      size="sm"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const darkMode = ref(false)
    const $q = useQuasar()

    watch(darkMode, (darkMode) => {
      $q.dark.set(true)
      $q.localStorage.set('darkMode', darkMode)
    })

    onMounted(() => {
      const darkModeIsActive = $q.localStorage.getItem('darkMode')
      if (darkModeIsActive) {
        darkMode.value = true
      }
    })

    return {
      darkMode
    }
  }

})
</script>
