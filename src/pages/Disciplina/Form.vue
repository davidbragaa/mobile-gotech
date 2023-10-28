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
        label="Name"
        v-model="form.name"
        :rules="[val => !!val|| 'Name is required']"
        />

        <q-input
        label="Modulo"
        v-model="form.name"
        :rules="[val => !!val|| 'Modulo is required']"
        type="number"
        />

        <q-btn
          :label="Save ? 'Update' : 'Salve'"
          color="secondary"
          class="full-width"
          outline
          rounded
          type="submit"
          />

          <q-btn
          label="Cancel"
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
    const table = 'disciplina'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let disciplina = {}
    const form = ref({
      name: '',
      modulo: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetDisciplina(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Update Sucesso')
        } else {
          await post(table, form.value)
          notifySuccess('Salvo com Sucesso')
        }

        router.push({ name: disciplina })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetDisciplina = async (id) => {
      try {
        disciplina = await getById(table, id)
        form.value = disciplina
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
