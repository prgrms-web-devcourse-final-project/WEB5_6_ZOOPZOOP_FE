'use client'

import { InviteRequest } from '@/entities/invitation'
import { Check, Loader2 } from 'lucide-react'

interface Props {
  inviteId: number
  handleAccept: (payload: InviteRequest) => void
  isAccepting: boolean
  spaceId: number
}

const AcceptButton = ({
  inviteId,
  handleAccept,
  isAccepting,
  spaceId
}: Props) => {
  const handleClick = () => {
    handleAccept({ inviteId, spaceId })
  }

  return (
    <button
      onClick={handleClick}
      className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-green-500
                     transition-colors cursor-pointer"
      aria-label="수락"
      disabled={isAccepting}>
      {isAccepting ? (
        <Loader2
          className="animate-spin size-4"
          aria-hidden
        />
      ) : (
        <Check
          className="size-4"
          aria-hidden
        />
      )}
    </button>
  )
}
export default AcceptButton
