<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p> Seja muito bem vindo a Etec. {{ user.user_metadata.name }}</p>
    </div>

  </q-page>
  </template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageME',
  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
