import { supabase } from '@/supabaseClient'

export async function makeNewMemory({
  mood,
  visibility,
  description,
  sport_id,
  user_id,
  date,
}: {
  mood: '0' | '1'
  visibility: '0' | '1'
  description: string
  sport_id: number
  user_id: string
  date: string
}) {
  const { data, error } = await supabase
    .from('memories')
    .insert({
      mood,
      visibility,
      description,
      sport_id,
      user_id,
      date,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getAllUserMemories() {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData) {
    throw new Error('User not authenticated')
  }
  const { data, error } = await supabase
    .from('memories')
    .select(
      `
      id,date,description,visibility,mood,
      sport:sports(id,name),
      user:users(id,name)
         `
    )
    .eq('user_id', userData?.user.id)
  if (error) throw new Error(error.message)
  return data
}
