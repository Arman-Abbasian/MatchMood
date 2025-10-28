import { useMutation } from '@tanstack/vue-query'
import { makeNewUser } from './user-api'

export function useMakeNewUserMutation() {
  return useMutation({
    mutationFn: makeNewUser,
    onSuccess: (data: any) => {
      return data
    },
    onError: (error: any) => {
      return error
    },
  })
}
