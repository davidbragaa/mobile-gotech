<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="disciplinas"
        :columns="columnsDisciplinas"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Disciplinas
          </span>
            <q-space />
            <option disabled value="true" color="primary">Escolha o Curso</option>
              <q-select
              standout
              label= "Curso"
              v-model="selectedCurso"
              dense
              :options= "opções"
              />
              <!-- Adicione uma coluna para exibir o QR code -->
        </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <div class="col-8 text-center">
                <q-btn
                  v-if="!cameraStart"
                  label=""
                  color="secondary"
                  icon="mdi-camera-iris"
                  @click="openCamera(props.row)"
                />
                <img :src="imageSrc">
              </div>
            </q-td>
          </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { columnsDisciplinas } from './table'
import { Camera, CameraResultType } from '@capacitor/camera'

export default defineComponent({

  name: 'PageDisciplinaList',
  setup () {
    const disciplinas = ref([])
    const loading = ref(true)
    const table = 'Disciplinas'
    const { list } = useApi()
    const { notifyError } = useNotify()
    const selectedCurso = ref(null)

    const handleListDisciplinas = async () => {
      try {
        loading.value = true
        if (selectedCurso.value) {
          // Se um curso foi selecionado, filtre as disciplinas com base no curso
          disciplinas.value = await list(table, { curso: selectedCurso.value })
        } else {
          // Caso contrário, liste todas as disciplinas
          disciplinas.value = await list(table)
        }
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }
    onMounted(() => {
      handleListDisciplinas()
    })

    const openCamera = async (disciplinas) => {
      try {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri // Capturar resultado como URI
        })

        // O código QR não é mais relevante neste contexto
        console.log('Imagem capturada:', image.webPath)
      } catch (error) {
        console.error('Erro ao acessar a câmera:', error)
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
      columnsDisciplinas,
      selectedCurso,
      disciplinas,
      loading,
      opções,
      openCamera
    }
  }
})
</script>
