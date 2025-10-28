import { useMutation } from '@tanstack/vue-query'
import { register } from './auth-api'

export function useSignUpMutation() {
  return useMutation({
    mutationFn: register,
    onSuccess: (data: any) => {
      return data
    },
    onError: (error: any) => {
      return error
    },
  })
}
