import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  getAllPublicMemories,
  getAllUserMemories,
  makeNewMemory,
} from './memory-api'

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

export function useGetAllUserMemories() {
  return useQuery({
    queryKey: ['memories'],
    queryFn: getAllUserMemories,
  })
}

export function useGetAllPublicMemories() {
  return useQuery({
    queryKey: ['memories'],
    queryFn: getAllPublicMemories,
  })
}
