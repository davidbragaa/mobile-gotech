<template>
  <q-page class="flex flex-center">
    <div v-if="user">
        <div class="q-gutter-md row items-start">
          <q-img
          sv-for="mode in fitModes"
          src="../assets/Etec.jpeg"
          style=" max-width: 300px;height: 150px;"
          :fit="mode"
           />
        <strong> <p> Bem vindo Aluno. {{ user.user_metadata.name }}</p></strong>
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
