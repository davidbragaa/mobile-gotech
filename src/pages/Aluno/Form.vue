<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-he">
         Aluno
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
        label="Name"
        v-model="form.name"
        :rules="[val => !!val|| 'Name is required']"
        />

        <q-input
        label="Email"
        v-model="form.name"
        :rules="[val => (val && val.length > 0) || 'Email is required']"
        />

        <q-input
        label="R.A"
        v-model="form.name"
        :rules="[val => !!val|| 'RA is required']"
        type="number"
        />

        <q-btn
          :label="Save ? 'Update' : 'Salve'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
          />

          <q-btn
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'aluno' }"
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
  name: 'PageFormAluno',
  setup () {
    const table = 'aluno'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let aluno = {}
    const form = ref({
      name: '',
      email: '',
      ra: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetAluno(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Update Sucesso')
        } else {
          await post(table, form.value)
          notifyError('Salvo com Sucesso')
        }

        router.push({ name: aluno })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetAluno = async (id) => {
      try {
        aluno = await getById(table, id)
        form.value = aluno
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
