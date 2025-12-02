import { supabase } from '@/supabaseClient'
import type { SportsType } from './global-typs'

export async function getAllSports(): Promise<SportsType[]> {
  const { data, error } = await supabase.from('sports').select()

  if (error) throw new Error(error.message)
  return data as SportsType[]
}

export async function getAllUserStatistics() {
  const { data: allUserStatistics, error: allUserStatisticsError } =
    await supabase.rpc('get_all_user_memory_stats')
  if (allUserStatisticsError) throw new Error(allUserStatisticsError?.message)
  return allUserStatistics
}
