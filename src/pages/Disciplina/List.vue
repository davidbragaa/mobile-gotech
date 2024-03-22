<template>
  <q-page padding>
    <div class="rows">
      <q-table :rows="disciplinas" :columns="columnsDisciplinas" row-key="id" class="col-12" :loading="loading" >
        <template v-slot:top>
          <span class="text-h6">
            Disciplinas
          </span>
            <q-space />
            <div class="full-width q-pt-xs">
              <q-select standout label="Curso" color="secondary" v-model="form.selectedCurso" dense rounded outlined size="xs" :options="curso.map(c => c.nome)"  />
            </div>
            <div class="q-mt-md ">
              <q-btn v-if="$q.platform.is.desktop" label="Adicionar" color="secondary" icon="mdi-plus" dense rounded :to="{ name: 'form-disciplina' }" />
            </div>
        </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <q-btn icon="mdi-pencil-outline" color="info" dense size="xs" @click="handleEdit(props.row)" >
                <q-tooltip>
                  Editar
                </q-tooltip>
              </q-btn>
              <q-btn icon="mdi-delete-outline" color="negative" dense size="xs" @click="handleRemoveDisciplinas(props.row)" >
                <q-tooltip>
                  Remove
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
      </q-table>
    </div>
      <q-page-sticky  position="bottom-right" :offset="[15, 10]" >
        <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="secondary" :to="{ name: 'form-disciplina' }" />
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
    const tableDisciplinas = 'Disciplinas' // Nome correto da tabela de disciplinas
    const tableCurso = 'Curso' // Nome correto da tabela de cursos
    const router = useRouter()
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({
      selectedCurso: null
    })

    const handleListDisciplinas = async () => {
      try {
        loading.value = true
        if (form.value.selectedCurso) {
          const disciplinasDoCurso = await list(tableDisciplinas, { curso: form.value.selectedCurso })
          if (disciplinasDoCurso.length > 0) {
            disciplinas.value = disciplinasDoCurso.filter(disciplina => disciplina.curso === form.value.selectedCurso)
          } else {
            // Não há disciplinas vinculadas a este curso
            disciplinas.value = []
            notifyError('Não há disciplinas vinculadas a este curso.')
          }
        } else {
          // Caso contrário, liste todas as disciplinas
          disciplinas.value = await list(tableDisciplinas)
        }
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
          title: 'Atenção',
          message: `Você está certo de apagar ${disciplina.nome} da lista?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(tableDisciplinas, disciplina.id)
          notifySuccess('Deletado com sucesso')
          handleListDisciplinas()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const fetchCursos = async () => {
      try {
        curso.value = await list(tableCurso)
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListDisciplinas()
      fetchCursos()
    })

    const opcoes = [
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
      form,
      loading,
      handleEdit,
      handleRemoveDisciplina,
      opcoes
    }
  }
})
</script>
