<template>
  <q-page class="flex flex-center">
    <div v-if="user">
        <div class="col-06 q-gutter-md row items-start">

        <strong> <h4>Bem vindo. {{ user.user_metadata.name }}</h4></strong>
        </div>
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
