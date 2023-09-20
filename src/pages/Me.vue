<template>
  <q-page class="flex flex-center">
    <div v-if="user">
<<<<<<< HEAD
        <div class="col-06 q-gutter-md row items-start">

=======
        <div class="q-gutter-md row items-start">
          <q-img
          sv-for="mode in fitModes"
          src="../assets/Etec.jpeg"
          style=" max-width: 300px;height: 150px;"
          :fit="mode"
           />
>>>>>>> e9895b63645b379cf505b5c53ab2dee70461886e
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
