'use client'

import { Check, Loader2 } from 'lucide-react'

interface Props {
  inviteId: number
  handleAccept: (inviteId: number) => void
  isAccepting: boolean
}

const AcceptButton = ({ inviteId, handleAccept, isAccepting }: Props) => {
  const handleClick = () => {
    handleAccept(inviteId)
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
