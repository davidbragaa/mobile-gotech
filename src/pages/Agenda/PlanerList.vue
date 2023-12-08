<template>
  <q-page padding>
    <div style="max-width: 800px; width: 100%;">
      <q-calendar
        v-model="selectedDate"
        view="day-resource"
        :resources="resources"
        :resource-height="50"
        interval-minutes="30"
        bordered
        sticky
        locale="en-us"
        style="height: 200px; max-width: 800px; width: 100%;"
      />
    </div>

      <q-btn
        color="secondary"
        icon="mdi-calendar-plus"
        class="q-mt-md"
        outline
        rounded
        size="lg"
        @click="showAddEventDialog"
        label="Adicionar Evento"
      />

    <q-dialog v-model="addEventDialog">
      <q-card>
        <q-card-section>
          <q-input v-model="newEventName" label="Nome do Evento" />
          <q-input v-model="newEventStart" label="Data de Início" type="datetime" />
          <q-input v-model="newEventEnd" label="Data de Fim" type="datetime" />
        </q-card-section>

        <q-card-actions class="row justify-center q-gutter-pt-sm">
          <q-btn label="Cancelar" flat color="negative" @click="closeAddEventDialog" />
          <q-btn label="Adicionar" flat color="positive" @click="addEvent" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'PagePlanerList',
  setup () {
    const model = ref('2023-11-17')
    const api = useApi()
    const events = ref([])
    const addEventDialog = ref(false)
    const newEventName = ref('')
    const newEventStart = ref('')
    const newEventEnd = ref('')

    const form = ref({
      date: null
    })

    const showAddEventDialog = () => {
      addEventDialog.value = true
    }

    const closeAddEventDialog = () => {
      addEventDialog.value = false
      newEventName.value = ''
      newEventStart.value = ''
      newEventEnd.value = ''
    }

    const addEvent = async () => {
      const currentDate = new Date() // Obtém a data atual
      const newEvent = {
        name: newEventName.value,
        start: newEventStart.value,
        end: newEventEnd.value,
        date_of_scheduling: currentDate.toISOString(), // Adiciona a data de agendamento
        color: 'blue' // Adapte conforme necessário
      }

      try {
        await api.post('events', newEvent) // Adicionando um novo evento usando a função post do useApi
        events.value.push(newEvent) // Atualizando localmente a lista de eventos
        closeAddEventDialog()
      } catch (error) {
        console.error('Erro ao adicionar evento:', error)
      }
    }

    return {
      model,
      events,
      form,
      addEventDialog,
      newEventName,
      newEventStart,
      newEventEnd,
      showAddEventDialog,
      closeAddEventDialog,
      addEvent,
      selectedDate: '',
      resources: [
        { label: 'Laboratorio I' },
        { label: 'Laboratorio II' },
        { label: 'Laboratorio III' },
        { label: 'Laboratorio IV' },
        { label: 'Laboratorio V' },
        { label: 'Laboratorio VI' },
        { label: 'Sala Maker' }
      ]
    }
  }
})
</script>
