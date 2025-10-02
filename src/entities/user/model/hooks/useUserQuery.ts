import { useQuery } from '@tanstack/react-query'
import { User } from '../type'
import { fetchUserClient } from '../../api/user.client'

interface UserQuery {
  enabled?: boolean
}

export const useUserQuery = ({ enabled = true }: UserQuery) => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: fetchUserClient,
    refetchOnWindowFocus: false,
    enabled
  })
}
