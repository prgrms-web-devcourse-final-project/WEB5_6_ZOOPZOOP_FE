'use client'

import {
  AcceptButton,
  CancelButton,
  useFetchInvitations,
  useAcceptInvitation,
  useCancelInvitation
} from '@/features/invitation'
import { InvitationItem } from '@/entities/invitation'
import NotificationSkeletonList from './NotificationSkeletonList'

const NotificationList = () => {
  const { invitations, isPending } = useFetchInvitations()
  const { handleAccept, isAccepting, acceptingInviteId } = useAcceptInvitation()
  const { handleCancel, isCanceling, cancelingInviteId } = useCancelInvitation()

  return (
    <div>
      <header className="px-3 py-2 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">알림</h3>
        </div>
      </header>
      <ul className="max-h-80 overflow-y-auto">
        {isPending ? (
          <NotificationSkeletonList />
        ) : (
          <>
            {invitations.length > 0 ? (
              invitations.map(invite => (
                <InvitationItem
                  key={invite.inviteId}
                  spaceName={invite.spaceName}
                  spaceThumbnailUrl={invite.spaceThumbnailUrl}
                  acceptAction={
                    <AcceptButton
                      inviteId={invite.inviteId}
                      handleAccept={handleAccept}
                      spaceId={invite.spaceId}
                      isAccepting={
                        isAccepting && acceptingInviteId === invite.inviteId
                      }
                    />
                  }
                  cancelAction={
                    <CancelButton
                      inviteId={invite.inviteId}
                      handleCancel={handleCancel}
                      spaceId={invite.spaceId}
                      isCanceling={
                        isCanceling && cancelingInviteId === invite.inviteId
                      }
                    />
                  }
                />
              ))
            ) : (
              <div className="py-12 px-4 text-center">
                <p className="text-xs text-slate-400">새로운 초대가 없습니다</p>
              </div>
            )}
          </>
        )}
      </ul>
      <footer className="px-4 py-2.5 border-t border-slate-100" />
    </div>
  )
}
export default NotificationList
