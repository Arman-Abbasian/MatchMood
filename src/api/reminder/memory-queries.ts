import { useMutation } from '@tanstack/vue-query'
import { makeNewMemory } from './memory-api'

export function useMakeNewMemoryMutation() {
  return useMutation({
    mutationFn: makeNewMemory,
    onSuccess: (data: any) => {
      return data
    },
    onError: (error: any) => {
      return error
    },
  })
}
