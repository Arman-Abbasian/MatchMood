import type { LoginInterface, SignupInterface } from '@/@types/auth'
import { supabase } from '@/supabaseClient'

export async function signup(values: SignupInterface) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  })
  if (error) throw new Error(error.message)
  return data
}

export async function login(values: LoginInterface) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })
  if (error) throw new Error(error.message)
  return data
}
