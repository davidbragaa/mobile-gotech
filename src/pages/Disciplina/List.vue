<template>
  <q-page padding>
    <div class="rows">
      <q-table
        :rows="disciplina"
        :columns="columnsDisciplinas"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Disciplina
          </span>
            <q-space />
            <q-select
            standout v-model = "modelo"
            dense
            :options =  "opções"
            />

            <q-select
            standout  v-model = "model"
            :options = "options"
            dense
            />

            <q-btn
              v-if="$q.platform.is.desktop"
              label="Adicionar"
              color="secondary"
              icon="mdi-plus"
              dense
              :to="{ name: 'form-disciplina' }"
              />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-radio
              keep-color  v-model = "color"
              val = "teal"
              label = ""
              color = "teal"
            />

            <q-radio
              keep-color  v-model = "color"
              val = "red"
              label = ""
              color = "red"
            />
          </q-td>
          <div  class = " q-gutter-sm " >

          </div >
        </template>
      </q-table>
    </div>
      <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      >
        <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="secondary"
        :to="{ name: 'form-disciplina' }" />
      </q-page-sticky>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsDisciplinas } from './table'

export default defineComponent({

  name: 'PageDisciplinaList',
  setup () {
    const disciplina = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'Disciplina'
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListDisciplina = async () => {
      try {
        loading.value = true
        disciplina.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (disciplina) => {
      router.push({ name: 'form-disciplina', params: { id: disciplina.id } })
    }

    const handleRemoveDisciplina = async (disciplina) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Você está certo de deletar ${disciplina.value.nome} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, disciplina.value.id)
          notifySuccess('Delete com sucesso')
          handleListDisciplina()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListDisciplina()
    })

    return {
      modelo: ref(null),
      opções: [
        'Administração',
        'Desenvolvimento de Sistemas',
        'Informática',
        'Logística',
        'Recursos Humanos',
        'Segurança do Trabalho'
      ],
      options: [
        'Modulo 1',
        'Modulo 2',
        'Modulo 3'
      ],
      color: ref('ciano', 'red'),
      denso: ref(false),
      DenseOpts: ref(true),
      columnsDisciplinas,
      disciplina,
      loading,
      handleEdit,
      handleRemoveDisciplina

    }
  }

})
</script>
