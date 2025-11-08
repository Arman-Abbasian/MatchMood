import { useMutation } from '@tanstack/vue-query'
import { login, signup } from './auth-api'

export function useSignUpMutation() {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data: any) => {
      return data
    },
    onError: (error: any) => {
      return error
    },
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      return data
    },
    onError: (error: any) => {
      return error
    },
  })
}
