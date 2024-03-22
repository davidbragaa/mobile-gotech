<template>
  <q-page padding>
    <div class="row justify-center q-gutter-pt-sm">
      <h4>Agendamento</h4>
    </div>
    <div class="full-width q-pt-xs">
      <FullCalendar
        :options="calendarOptions"
        @dateClick="openDialog"
        ref="calendar"
        mask="DD/MM/YYYY"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <q-input v-model="meetingTitle" label="Título da Reunião" />
          <q-datetime v-model="meetingTime" label="Horário" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="negative" @click="closeDialog" />
          <q-btn label="Salvar" color="positive" @click="saveEvent" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'PagePlanerList',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  setup () {
    const calendar = ref(null)
    const api = useApi()

    const calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      selectable: true // Habilita a seleção de datas
    }

    const dialog = ref(false)
    const meetingTitle = ref('')
    const meetingTime = ref('')

    const openDialog = (info) => {
      dialog.value = true
      meetingTitle.value = ''
      meetingTime.value = info.dateStr // Preenche com a data clicada
    }

    const closeDialog = () => {
      dialog.value = false
    }

    const saveEvent = async () => {
      try {
        await api.post('seu_tabela', {
          title: meetingTitle.value,
          start: meetingTime.value
          // Adicione outros campos conforme necessário para seu modelo de dados
        })

        dialog.value = false
      } catch (error) {
        console.error('Erro ao adicionar evento:', error.message)
        // Lida com o erro de inserção, se necessário
      }
    }

    return {
      calendar,
      calendarOptions,
      dialog,
      meetingTitle,
      meetingTime,
      openDialog,
      closeDialog,
      saveEvent
    }
  }
})
</script>
