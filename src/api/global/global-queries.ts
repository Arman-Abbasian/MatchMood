import { useQuery } from '@tanstack/vue-query'
import { getAllSports, getAllUserStatistics } from './global-api'
import type { SportsType } from './global-typs'

export function useGetAllSports() {
  return useQuery<SportsType[], Error>({
    queryKey: ['sports'],
    queryFn: getAllSports,
  })
}

export function useGetAllUserStatisticsQuery() {
  return useQuery({
    queryKey: ['GetAllUserStatistics'],
    queryFn: getAllUserStatistics,
  })
}
