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
          size="lg"
          rounded
          outlined
          :options="laboratorio"
          option-label="nome"
        />
        <br>

        <div class="q-pa-sm row items-left justify-left q-gutter-pt-sm">
          <!-- Seletor de Data -->
            <q-btn icon="event" round color="secondary">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.days" range mask="DD/MM/YYYY" color="secondary" today-btn>
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="OK" color="secondary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
            <br>
              <!-- Exibição da data selecionadas -->
            <div class="q-mt-md text-h6 itens-center"  color="secondary" >
              Data: {{ form.days }}
            </div>
        </div>

          <!-- Seletor de Hora -->
          <div class="q-pa-sm row items-center justify-right q-gutter-pt-sm">
            <q-btn icon="mdi-clock-digital" round color="secondary">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="form.date" label="Horário" color="secondary" >
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="OK" color="secondary" flat v-close-popup />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-btn>
            <!-- Exibição da hora selecionadas -->
            <div class="q-mt-md text-h6" color="secondary" >
              Hora: {{ form.date }}
            </div>
          </div>

        <!-- Botão para agendar -->
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Agendar"
            color="secondary"
            class="full-width"
            rounded
            outline
            size="lg"
            @click="save"
          />
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
      days: null,
      time: null
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
      if (form.value.selectedLaboratorio && form.value.days && form.value.date) {
        try {
          const labId = form.value.selectedLaboratorio.id
          const reservationDate = new Date(form.value.days) // Converte a data para um objeto Date
          const reservationTime = form.value.date // Obtém o horário selecionado

          // Obtém a hora e os minutos do horário selecionado
          const hours = reservationTime.split(':')[0]
          const minutes = reservationTime.split(':')[1]

          // Define a data de início com a data selecionada e o horário escolhido
          reservationDate.setHours(hours)
          reservationDate.setMinutes(minutes)

          // Define a lógica para o horário de término (por exemplo, uma hora após o início)
          const endDateTime = new Date(reservationDate.getTime() + 50 * 50 * 1000) // Adiciona 1 hora ao início

          // ... lógica para salvar a reserva com data, horário de início e término

          await saveReservation('ReservasLaboratorio', labId, {
            dataInicio: reservationDate.toISOString(),
            dataFim: endDateTime.toISOString(),
            agendamento: reservationDate.toISOString() // Pode ser o campo de agendamento que já está sendo passado
          })

          notifySuccess('Reserva salva com sucesso')
        } catch (error) {
          notifyError(error.message)
        }
      } else {
        notifyError('Por favor, selecione o laboratório e a data.')
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
      laboratorio,
      days: ref()
    }
  }
})
</script>
