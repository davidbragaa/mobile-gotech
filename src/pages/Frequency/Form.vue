<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h4">
        Frequência
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
        label="Name"
        v-model="form.name"
        :rules="[val => (val.length > 0) || 'Name is required']"
        />

        <q-editor
        v-model="form.description"
        min-height="5rem"
        />

        <q-input
        label="Quantidade de Aulas"
        v-model="form.amount"
        :rules="[val => !!val|| 'Amount is required']"
        type="number"
        />

        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
          />

          <q-btn
          label="Voltar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{name: 'frequency'}"
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
  name: 'PageFormFrequencia',
  setup () {
    const table = 'aluno'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let frequencia = {}
    const optionsAluno = ref([])
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      aluno_id: ''
    })

    onMounted(() => {
      handleListAluno()
      if (isUpdate.value) {
        handleGetFrequencia(isUpdate.value)
      }
    })

    const handleListAluno = async () => {
      optionsAluno.value = await list('aluno')
    }

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Atualizado com Sucesso')
        } else {
          await post(table, form.value)
          notifySuccess('Salvo com Sucesso')
        }
        router.push({ name: 'frequency' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetFrequencia = async (id) => {
      try {
        frequencia = await getById(table, id)
        form.value = frequencia
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      handleSubmit,
      form,
      isUpdate,
      optionsAluno
    }
  }
})
</script>
