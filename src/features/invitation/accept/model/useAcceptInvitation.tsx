import { useAcceptInvitationMutation } from '@/entities/invitation'

export const useAcceptInvitation = () => {
  // tanstack query
  const { acceptInvitationMutate, isAccepting } = useAcceptInvitationMutation({
    onSuccess: () => {
      // 성공
    },
    onError: () => {
      // 실패ㄴ
    }
  })

  return {
    handleAccept: acceptInvitationMutate,
    isAccepting
  }
}
