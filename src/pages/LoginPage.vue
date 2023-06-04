<template>
  <form @submit.prevent="submitForm" class="login-form">
    <div class="form-group">
      <label for="username">Usuário:</label>
      <input type="text" id="username" v-model="username">
    </div>
    <div class="form-group">
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password">
    </div>
    <div class="form-group">
      <button type="submit" class="button-color" @click="redirectToHome">Entrar</button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const router = useRouter()

    const redirectToHome = () => {
      router.push({ name: 'HomePage' })
    }

    return {
      redirectToHome
    }
  }
})
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.form-group label {
  width: 80px;
  margin-right: 10px;
}

.button-color {
  background-color: #002956;
  color: #FFFFFF;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-color:hover {
  background-color: #002956;
}
</style>
