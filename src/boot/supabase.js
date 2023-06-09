import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://anezlkiwrubpnwxrwmgl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZXpsa2l3cnVicG53eHJ3bWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxOTIwNDEsImV4cCI6MjAwMTc2ODA0MX0.QDGG4dVUDhQIzGKK4qEPb_MvhZlUOzj3oQgQSUF6CA0'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((evente, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
