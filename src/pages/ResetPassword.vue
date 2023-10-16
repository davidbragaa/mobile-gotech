<template>
  <q-page padding>
    <q-form @submit.prevent="handlePasswordReset">
      <div class="row justify-center">
        <p class="col-12 text-h4 text-center">Redefinir Senha</p>
        <div class="col-md-4 col-sm-6 col-xs-10">

          <q-input
            label="Coloque sua nova senha"
            v-model="password"
            lazy-rules=""
            :rules="[val => (val && val.length >= 6) || 'Password is required send a 6 characters !']"
            type="password"
          />

          <div class="full-width q-pt-md">
            <q-btn
            label="Salvar"
            color="secondary"
            class="full-width"
            outline
            rounded
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
import useNotify from 'src/composables/UseNotify'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageResetPassword',

  setup () {
    const { resetPassword } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const router = useRouter()
    const route = useRoute()
    const token = route.query.token

    const password = ref('')

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        notifySuccess('New password sent')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      password,
      handlePasswordReset
    }
  }
})

</script>
