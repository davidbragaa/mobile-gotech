<template>
  <q-page padding>
    <q-form @submit.prevent="handleRegister">
      <div class="row justify-center">
        <p class="col-12 text-h4 text-center">Register</p>
        <div class="col-md-4 col-sm-6 col-xs-10">

          <q-input
        label="Name"
        v-model="form.name"
        />

        <q-input
        label="Email"
        v-model="form.email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          />

          <div class="full-width q-pt-md">
            <q-btn
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounder
            size="lg"
            type="submit"
            />
          </div>

    </div>
  </div>
  </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })
    const handleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        alert(error)
      }
    }
    return {
      form,
      handleRegister
    }
  }
})
</script>
