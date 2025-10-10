import { Invitation, useAcceptInvitationMutation } from '@/entities/invitation'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useQueryClient } from '@tanstack/react-query'

interface MutationContext {
  prevInvitations: Invitation[]
}

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient()
  // tanstack query
  const { acceptInvitationMutate, isAccepting } = useAcceptInvitationMutation({
    onMutate: async inviteId => {
      await queryClient.cancelQueries({ queryKey: ['invitations'] })

      const prevInvitations = queryClient.getQueryData<Invitation[]>([
        'invitations'
      ])
      if (prevInvitations) {
        const newInvitations = prevInvitations.filter(
          invitation => invitation.inviteId !== inviteId
        )

        queryClient.setQueryData(['invitations'], newInvitations)
      }
      return { prevInvitations }
    },
    onSuccess: () => {
      showSuccessToast('스페이스 초대를 수락했습니다')
      queryClient.invalidateQueries({ queryKey: ['spaces'] })
    },
    onError: (error, _, onMutateResult) => {
      showErrorToast(error.message)
      const context = onMutateResult as MutationContext
      if (context.prevInvitations) {
        queryClient.setQueryData(['invitations'], context.prevInvitations)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
    }
  })

  return {
    handleAccept: acceptInvitationMutate,
    isAccepting
  }
}
