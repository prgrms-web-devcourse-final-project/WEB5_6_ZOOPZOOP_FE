import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'
import { fetchInvitationsClient, acceptInvitationClient } from '../api'
import { InviteResult, Invitation } from './type'

// 알림 목록 데이터 패칭
export const useInvitationQuery = () => {
  return useQuery<Invitation[] | null>({
    queryKey: ['notification'],
    queryFn: fetchInvitationsClient
  })
}

// 알림 수락
export const useAcceptInvitationMutation = (
  options: UseMutationOptions<InviteResult | null, Error, number>
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['notification', 'accept'],
    mutationFn: inviteId => acceptInvitationClient(inviteId),
    ...options
  })

  return {
    acceptInvitationMutate: mutate,
    isAccepting: isPending
  }
}
