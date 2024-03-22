import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'

export default function useApi () {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()

  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
    if (error) throw error
    return data
  }

  const getById = async (table, id, nome) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id, 'nome', nome)
    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const currentDate = new Date() // Obtém a data atual
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id,
          date_of_scheduling: currentDate.toISOString() // Adiciona a data de agendamento ao inserir
        }
      ])
    if (error) throw error
    return data
  }
  const update = async (table, form) => {
    const existingDisciplina = await getById(table, form.id)
    const checkinCode = existingDisciplina.checkin_code

    const { data, error } = await supabase
      .from(table)
      .update({ ...form, checkin_code: checkinCode })
      .match({ id: form.id })
    if (error) throw error
    return data
  }

  const saveReservation = async (table, id, reservationDate) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .update({ reservationDate })
        .match({ id })
      if (error) throw error
      return data
    } catch (error) {
      throw new Error('Erro ao salvar reserva: ' + error.message)
    }
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }

  return {
    list,
    getById,
    post,
    update,
    saveReservation,
    remove

  }
}
