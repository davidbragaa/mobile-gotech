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
              <q-btn
                v-if="$q.platform.is.desktop"
                label="Adicionar"
                color="secondary"
                icon="mdi-plus"
                dense
                :to="{ name: 'form-disciplina' }"
                />
              <q-select
              standout
              label="Curso"
              v-model="selectedCurso"
              dense
              option: opções
                />
        </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense size="xs"
              @click="handleEdit(props.row)"
              >
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
              <q-btn
                icon="mdi-delete-outline"
                color="negative"
                dense size="xs"
                @click="handleRemoveDisciplinas(props.row)"
                >
                <q-tooltip>
                  Remove
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
      </q-table>
    </div>
      <q-page-sticky
        position="bottom-left"
        :offset="[15, 10]"
      >
        <q-btn
          v-if="$q.platform.is.mobile"
          fab
          icon="mdi-plus"
          color="secondary"
          :to="{ name: 'form-disciplina' }"
        />
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
    const disciplinas = ref([])
    const curso = ref([])
    const loading = ref(true)
    const table = 'Disciplinas'
    const router = useRouter()
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const selectedCurso = ref([])

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

    const handleEdit = (disciplinas) => {
      router.push({ name: 'form-disciplina', params: { id: disciplinas.id } })
    }

    const handleRemoveDisciplinas = async (disciplinas) => {
      try {
        $q.dialog({
          title: 'Atenção',
          message: `Você está certo de apagar ${disciplinas.nome}da lista ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, disciplinas.value.id)
          notifySuccess('Delete com sucesso')
          handleListDisciplinas()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    // Adicione uma chamada para obter a lista de cursos
    const fetchCursos = async () => {
      try {
        curso.value = await list(table)
      } catch (error) {
        notifyError(error.message)
      }
    }
    onMounted(() => {
      handleListDisciplinas()
      fetchCursos()
    })

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
      disciplinas,
      curso,
      loading,
      handleEdit,
      handleRemoveDisciplinas,
      selectedCurso,
      option: opções
    }
  }
})
</script>
