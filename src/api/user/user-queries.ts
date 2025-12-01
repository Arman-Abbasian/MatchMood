import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  getUser,
  getUserDailyMemoriesCount,
  getUserData,
  getUserStatistics,
  makeNewUser,
} from './user-api'

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

export function useGetUserQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}

export function useGetUserDataQuery() {
  return useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  })
}

export function useGetUserStatisticsQuery() {
  return useQuery({
    queryKey: ['GetUserStatistics'],
    queryFn: getUserStatistics,
  })
}

export function useGetUserDailyMemoriesCountQuery() {
  return useQuery({
    queryKey: ['GetUserDailyMemoriesCount'],
    queryFn: getUserDailyMemoriesCount,
  })
}
