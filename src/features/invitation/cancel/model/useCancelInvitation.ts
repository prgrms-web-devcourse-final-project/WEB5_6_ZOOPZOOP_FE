import { Invitation, useCancelInvitationMutation } from '@/entities/invitation'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useQueryClient } from '@tanstack/react-query'

interface MutationContext {
  prevInvitations: Invitation[]
}

export const useCancelInvitation = () => {
  const queryClient = useQueryClient()

  const { cancelInvitationMutate, isCanceling, variables } =
    useCancelInvitationMutation({
      onMutate: async ({ inviteId }) => {
        await queryClient.cancelQueries({ queryKey: ['invitations'] })

        const preInvitations = queryClient.getQueryData<Invitation[]>([
          'invitations'
        ])

        if (preInvitations) {
          const newInvitations = preInvitations.filter(
            invitation => invitation.inviteId !== inviteId
          )
          queryClient.setQueryData(['invitations'], newInvitations)
        }

        return { preInvitations }
      },
      onSuccess: data => {
        showSuccessToast(`'${data?.name}' 초대를 거절했습니다.`)
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
    handleCancel: cancelInvitationMutate,
    isCanceling,
    cancelingInviteId: variables?.inviteId
  }
}
