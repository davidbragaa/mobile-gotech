<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-he">
         Professor
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
        label="Name"
        v-model="form.nome"
        :rules="[val => !!val|| 'Name is required']"
        />

        <q-input
        label="Email"
        v-model="form.email"
        :rules="[val => (val && val.length > 0) || 'Email is required']"
        />

        <q-input
        label="Senha"
        v-model="form.senha"
        :rules="[val => (val && val.length >=6) || 'Email is required']"
        />

        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
          color="secondary"
          class="full-width"
          outline
          rounded
          type="submit"
          />

          <q-btn
          label="Cancelar"
          color="secondary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'professor' }"
          />

      </q-form>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormProfessor',
  setup () {
    const table = 'Professor'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let professor = {}
    const form = ref({
      nome: '',
      email: '',
      senha: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetProfessor(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Atualizado com Sucesso')
        } else {
          await post(table, form.value)
          notifySuccess('Salvo com Sucesso')
        }

        router.push({ name: 'professor' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProfessor = async (id) => {
      try {
        professor = await getById(table, id)
        form.value = professor
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      handleSubmit,
      form,
      isUpdate
    }
  }
})
</script>
