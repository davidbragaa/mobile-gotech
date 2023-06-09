<template>
<q-page padding>
  <q-form @submit.prevent="handleLogin">
    <div class="row justify-center">
      <p class="col-12 text-h4 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10">
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
          label="Login"
          color="secundary"
          class="full-width"
          outline
          rounder
          size="lg"
          type="submit"
          />
        </div>

        <div class="full-width ">
          <q-btn
          label="Register"
          color="primary"
          class="full-width"
          flat
          to="/register"
          />
        </div>
      </div>
    </div>

  </q-form>
</q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser.js'

export default defineComponent({
  name: 'PageLogin',
  setup () {
    const router = useRouter()
    const { login } = useAuthUser()
    const form = ref({
      email: '',
      password: ''
    })
    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'HomePage' })
      } catch (error) {
        alert(error.message)
      }
    }
    return {
      form,
      handleLogin
    }
  }

})

</script>
