<template>
  <q-page padding>
    <div class="row justify-center q-gutter-pt-sm">
      <span class="text-h6">
        Reserva de Laboratório
      </span>
      <q-space />
      <div class="full-width q-pt-xs">
        <q-select
          standout
          label="Laboratório"
          v-model="form.selectedLaboratorio"
          @update:model-value="onLaboratorioChange"
          color="secondary"
          dense
          rounded
          outlined
          :options="laboratorio"
          option-label="nome"
        />
        <br>
        <div class="q-pa-sm ">
          <q-date
            v-model="form.date"
            color="secondary"
            today-btn
            :event-color="(date) => date[9] % 2 === 0 ? 'teal' : 'orange'">

            <div class="row items-center justify-end q-gutter-lg">
              <q-btn
                label="Agendar"
                color="secondary"
                class="q-mt-md"
                flat
                @click="save"
                v-close-popup
              />
            </div>
          </q-date>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageLaboratorioList',
  setup () {
    const laboratorio = ref([])
    const table = 'Laboratorio'
    const loading = ref(true)
    const proxyDate = ref()
    const { list, saveReservation } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      selectedLaboratorio: null,
      date: null
    })

    const handleListLaboratorio = async () => {
      try {
        loading.value = true
        laboratorio.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListLaboratorio()
    })

    const save = async () => {
      if (form.value.selectedLaboratorio && form.value.date) {
        try {
          const labId = form.value.selectedLaboratorio.id
          const reservationDate = form.value.date
          await saveReservation(table, labId, reservationDate)
          notifySuccess('Reserva salva com sucesso')
        } catch (error) {
          notifyError(error.message)
        }
      } else {
        notifyError('Por favor, selecione um laboratório e uma data para agendar.')
      }
    }

    const onLaboratorioChange = (value) => {
      form.value.selectedLaboratorio = value
    }

    return {
      proxyDate,
      loading,
      form,
      save,
      onLaboratorioChange,
      laboratorio
    }
  }
})
</script>
