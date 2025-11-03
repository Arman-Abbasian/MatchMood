import { supabase } from '@/supabaseClient'

export async function makeNewUser({
  userId,
  name,
}: {
  userId: string
  name: string
}) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      name,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function checkUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data
}
