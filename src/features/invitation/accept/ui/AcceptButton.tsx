'use client'

import { Check } from 'lucide-react'
import { useAcceptInvitation } from '../model/useAcceptInvitation'

const AcceptButton = () => {
  const { handleAccept, isAccepting } = useAcceptInvitation()

  return (
    <button
      onClick={() => handleAccept(123)}
      className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-green-500
                     transition-colors cursor-pointer"
      aria-label="수락">
      <Check className="size-4" />
    </button>
  )
}
export default AcceptButton
