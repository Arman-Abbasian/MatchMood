import type { SignupInterface } from '@/@types/auth'
import { supabase } from '@/supabaseClient'

export async function register(values: SignupInterface) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  })
  if (error) throw new Error(error.message)
  return data
}
