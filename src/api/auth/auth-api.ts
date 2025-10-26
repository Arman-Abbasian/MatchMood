import type { SignupInterface } from '@/@types/auth'
import { supabase } from '@/supabaseClient'

export async function register(
  values: SignupInterface
): Promise<{ data: any; error: any }> {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  })

  return { data, error }
}
