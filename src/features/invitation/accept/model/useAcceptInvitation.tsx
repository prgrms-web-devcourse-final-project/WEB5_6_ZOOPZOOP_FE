import { useAcceptInvitationMutation } from '@/entities/invitation'
import { showErrorToast } from '@/shared/ui/toast/Toast'

export const useAcceptInvitation = () => {
  // tanstack query
  const { acceptInvitationMutate, isAccepting } = useAcceptInvitationMutation({
    onSuccess: () => {
      // 성공
      showErrorToast('스페이스 초대를 수락했습니다')
    },
    onError: error => {
      // 실패
      showErrorToast(error.message)
    }
  })

  return {
    handleAccept: acceptInvitationMutate,
    isAccepting
  }
}
