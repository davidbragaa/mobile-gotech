<template>
  <q-page padding>
    <q-form @submit.prevent="handleRegister">
      <div class="row justify-center">
        <p class="col-12 text-h4 text-center">Cadastro</p>
        <div class="col-md-4 col-sm-6 col-xs-10">
          <!-- Inputs para cadastro -->
          <!-- ... Seus outros campos de cadastro ... -->
          <q-input
        label="Name"
        v-model="form.name"
        lazy-rules=""
        :rules="[val => (val.length > 0) || 'Name is required']"
        color="secondary"
        />

        <q-input
        label="Email"
        v-model="form.email"
        lazy-rules=""
        :rules="[val => (val && val.length > 0) || 'Email is required']"
        type="email"
        color="secondary"
        />

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules=""
          :rules="[val => (val && val.length >= 6) || 'Password is required and 6 characters']"
          type="password"
          color="secondary"
          />

          <!-- Seletor de Usuário -->
          <div class="full-width q-pt-md">
            <q-select
              label="Usuário"
              v-model="selectedUsuario"
              :options="usuario.map(user => ({ label: user.name, value: user.id }))"
              :rules="[val => !!val || 'Selecione um usuário']"
            />
          </div>

          <!-- Botões de Cadastro e Voltar -->
          <div class="full-width q-pt-md">
            <q-btn
              label="Cadastrar"
              color="secondary"
              class="full-width"
              outline
              rounded
              size="lg"
              type="submit"
            />

            <q-btn
              label="Voltar"
              color="secondary"
              class="full-width"
              outline
              rounded
              flat
              :to="{ name: 'login' }"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const { list } = useApi()
    const router = useRouter()

    const selectedUsuario = ref('')
    const usuario = ref([])
    const table = 'Usuario'

    const form = ref({
      email: '',
      password: '',
      name: '',
      usuario: ''

      // Seus campos do formulário
    })

    const fetchUsuarios = async () => {
      try {
        usuario.value = await list(table) // Buscar usuários da API
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      fetchUsuarios()
    })

    const handleRegister = async () => {
      try {
        // Lógica para o registro do usuário
        await register(form.value)
        notifySuccess('Usuário cadastrado com sucesso')
        router.push({ name: 'email-confirmation' }) // Redirecionar para a página de confirmação de email
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister,
      selectedUsuario,
      usuario
    }
  }
})
</script>
