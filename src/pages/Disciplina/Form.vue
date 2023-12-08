<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-he">
         Disciplina
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
        label="Disciplina"
        v-model="form.nome"
        :rules="[val => !!val|| 'Disciplina is required']"
        />

        <q-input
        label="Modulo"
        v-model="form.modulo"
        :rules="[val => !!val|| 'Modulo is required']"
        type="number"
        />

        <q-select
        label="Curso"
        v-model="selectedCurso"
        :options= "opções"
        lazy-rules=""
        :rules="[val => !!val|| 'Curso of user required']"
        />

        <q-btn
          :label="Save ? 'Atualizar' : 'Salvar'"
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
          :to="{ name: 'disciplina' }"
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
  name: 'PageFormDisciplina',
  setup () {
    const table = 'Disciplinas'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const selectedCurso = ref(null)

    const isUpdate = computed(() => route.params.id)

    let disciplinas = {}
    const form = ref({
      name: '',
      modulo: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetDisciplinas(isUpdate.value)
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

        router.push({ name: 'disciplina' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetDisciplinas = async (id) => {
      try {
        disciplinas = await getById(table, id)
        form.value = disciplinas
      } catch (error) {
        notifyError(error.message)
      }
    }

    const opções = [
      'Administração',
      'Desenvolvimento de Sistemas',
      'Informática',
      'Logística',
      'Recursos Humanos',
      'Segurança do Trabalho'
    ]
    return {
      handleSubmit,
      form,
      isUpdate,
      opções,
      selectedCurso
    }
  }
})
</script>
