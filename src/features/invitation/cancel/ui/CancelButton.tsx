import { InviteRequest } from '@/entities/invitation'
import { Loader2, X } from 'lucide-react'

interface Props {
  inviteId: number
  handleCancel: (payload: InviteRequest) => void
  spaceId: number
  isCanceling: boolean
}

const CancelButton = ({
  inviteId,
  handleCancel,
  isCanceling,
  spaceId
}: Props) => {
  const handleClick = () => {
    handleCancel({ inviteId, spaceId })
  }

  return (
    <button
      onClick={handleClick}
      className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-orange-accent
                     transition-colors cursor-pointer"
      aria-label="거절">
      {isCanceling ? (
        <Loader2
          className="size-4 animate-spin"
          aria-hidden
        />
      ) : (
        <X
          className="size-4"
          aria-hidden
        />
      )}
    </button>
  )
}
export default CancelButton
