'use client'

import { Check, Loader2 } from 'lucide-react'
import { useAcceptInvitation } from '../model/useAcceptInvitation'

interface Props {
  inviteId: number
}

const AcceptButton = ({ inviteId }: Props) => {
  const { handleAccept, isAccepting } = useAcceptInvitation()

  const handleClick = () => {
    handleAccept(inviteId)
  }

  return (
    <button
      onClick={handleClick}
      className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-green-500
                     transition-colors cursor-pointer"
      aria-label="수락">
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
