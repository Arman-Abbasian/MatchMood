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

// export function useCheckUserQuery() {
//   const query = useQuery({
//     queryKey: ['checkUser'],
//     queryFn: checkUser,
//     retry: false,
//   })

//   watch(query.data, (data) => {
//     if (data) {
//       return data
//     }
//   })

//   watch(query.error, (error) => {
//     if (error) {
//       return error
//     }
//   })
// }
