// import { formatCurrency } from 'src/utils/format'

const columnsFrequencia = [
  { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
  { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
  { name: 'presente', align: 'left', label: 'Presente', field: 'presente', sortable: true },
  { name: 'ausente', align: 'left', label: 'Ausente', field: 'ausente', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: false }

]

export {
  columnsFrequencia
}

const columnsALunos = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: '', field: 'actions', sortable: false }

]

export {
  columnsALunos
}
