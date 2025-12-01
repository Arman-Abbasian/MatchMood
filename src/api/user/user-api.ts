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

export async function getUserStatistics() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    if (error) throw new Error(error.message)
    return
  }
  const { data: userStatistics, error: userStatisticsError } =
    await supabase.rpc('get_user_memory_stats', {
      p_user_id: user.id,
    })
  if (error) throw new Error(userStatisticsError?.message)
  return userStatistics
}

export async function getUserDailyMemoriesCount() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    if (error) throw new Error(error.message)
    return
  }
  const { data: userDailyMemories, error: userDailyMemoriesError } =
    await supabase.rpc('get_user_daily_memories', {
      p_user_id: user.id,
    })
  if (error) throw new Error(userDailyMemoriesError?.message)
  return userDailyMemories
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
