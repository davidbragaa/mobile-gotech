<template>
  <q-page padding>
    <q-form @submit.prevent="handleForgotPassword">
      <div class="row justify-center">
        <p class="col-12 text-h4 text-center">Redefinir Senha</p>
        <div class="col-md-4 col-sm-6 col-xs-10">

          <q-input
            label="Email"
            v-model="email"
            lazy-rules=""
            :rules="[val => (val && val.length > 0) || 'Email is required !']"
            type="email"
          />

          <div class="full-width q-pt-md">
            <q-btn
            label="enviar e-mail"
            color="secondary"
            class="full-width"
            outline
            rounded
            size="lg"
            type="submit"
            />

            <q-btn
              label="Voltar"
              color="dark"
              class="full-width"
              outline
              rounded
              flat
              :to="{name: 'login'}"
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

export default defineComponent({
  setup () {
    const { sendPasswordResetEmail } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const email = ref('')

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess(`Password reset email send to: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleForgotPassword
    }
  }
})

</script>
