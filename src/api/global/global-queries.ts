import { useQuery } from '@tanstack/vue-query'
import { getAllSports } from './global-api'
import type { SportsType } from './global-typs'

export function useGetAllSports() {
  return useQuery<SportsType[], Error>({
    queryKey: ['sports'],
    queryFn: getAllSports,
  })
}
