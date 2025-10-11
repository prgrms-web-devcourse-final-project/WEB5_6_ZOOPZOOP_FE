import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'
import {
  fetchInvitationsClient,
  acceptInvitationClient,
  cancelInvitationClient
} from '../api'
import { InviteResult, Invitation } from './type'

// 알림 목록 데이터 패칭
export const useInvitationQuery = () => {
  return useQuery<Invitation[] | null>({
    queryKey: ['invitations'],
    queryFn: fetchInvitationsClient
  })
}

// 알림 수락
export const useAcceptInvitationMutation = (
  options: UseMutationOptions<InviteResult | null, Error, number>
) => {
  const { mutate, isPending, variables } = useMutation({
    mutationKey: ['invitation', 'accept'],
    mutationFn: inviteId => acceptInvitationClient(inviteId),
    ...options
  })

  return {
    acceptInvitationMutate: mutate,
    isAccepting: isPending,
    variables
  }
}

// 알림 거절
export const useCancelInvitationMutation = (
  options: UseMutationOptions<InviteResult | null, Error, number>
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['invitation', 'cancel'],
    mutationFn: inviteId => cancelInvitationClient(inviteId),
    ...options
  })

  return {
    cancelInvitationMutate: mutate,
    isCanceling: isPending
  }
}
