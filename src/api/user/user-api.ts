import { supabase } from '@/supabaseClient'

export async function makeNewUser({
  userId,
  name,
}: {
  userId: string
  name: string
}) {
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      name,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data
}

export async function getUserData() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    if (error) throw new Error(error.message)
    return
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw new Error(userError?.message)
  return userData
}
