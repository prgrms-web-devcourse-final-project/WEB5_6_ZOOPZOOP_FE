import { X } from 'lucide-react'

interface Props {
  inviteId: number
}

const CancelButton = ({ inviteId }: Props) => {
  return (
    <button
      onClick={() => {}}
      className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-orange-accent
                     transition-colors cursor-pointer"
      aria-label="거절">
      <X className="size-4" />
    </button>
  )
}
export default CancelButton
