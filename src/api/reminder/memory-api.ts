import { supabase } from '@/supabaseClient'

export async function makeNewMemory({
  mood,
  visibility,
  description,
  sport_id,
  date,
}: {
  mood: '0' | '1'
  visibility: '0' | '1'
  description: string
  sport_id: number
  date: string
}) {
  const { data, error } = await supabase
    .from('memories')
    .insert({
      mood,
      visibility,
      description,
      sport_id,
      date,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}
