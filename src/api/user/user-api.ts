import { supabase } from '@/supabaseClient'

export async function makeNewUser(
  userId: string,
  name: string
): Promise<{ data: any; error: any }> {
  const { data, error } = await supabase.from('profiles').insert({
    id: userId,
    name,
  })
  return { data, error }
}
