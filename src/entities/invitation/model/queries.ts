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
import { InviteResult, Invitation, InviteRequest } from './type'

// 알림 목록 데이터 패칭
export const useInvitationQuery = () => {
  return useQuery<Invitation[] | null>({
    queryKey: ['invitations'],
    queryFn: fetchInvitationsClient
  })
}

// 알림 수락
export const useAcceptInvitationMutation = (
  options: UseMutationOptions<InviteResult | null, Error, InviteRequest>
) => {
  const { mutate, isPending, variables } = useMutation({
    mutationKey: ['invitation', 'accept'],
    mutationFn: payload => acceptInvitationClient(payload),
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
  options: UseMutationOptions<InviteResult | null, Error, InviteRequest>
) => {
  const { mutate, isPending, variables } = useMutation({
    mutationKey: ['invitation', 'cancel'],
    mutationFn: payload => cancelInvitationClient(payload),
    ...options
  })

  return {
    cancelInvitationMutate: mutate,
    isCanceling: isPending,
    variables
  }
}
