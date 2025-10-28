import { supabase } from '@/supabaseClient'

export async function makeNewUser({
  userId,
  name,
}: {
  userId: string
  name: string
}) {
  const { data, error } = await supabase.from('profiles').insert({
    id: userId,
    name,
  })
  if (error) throw new Error(error.message)
  return data
}
