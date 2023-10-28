<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <div class="col-08 q-gutter-md row items-start">
        <strong> <h4>Bem vindo. {{ user.user_metadata.name }}</h4></strong>
      </div>
        <div class="col-6 text-center q-pt-md">
          <img
            alt="Image"
            src="~assets/home.png"
            style="width: 340px"
          >
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
