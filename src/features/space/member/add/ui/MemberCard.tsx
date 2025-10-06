import { X } from 'lucide-react'

interface Props {
  member: string
  onRemove: (name: string) => void
}

export const MemberCard = ({ member, onRemove }: Props) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
      <span className="flex-1 font-medium">{member}</span>
      <button
        onClick={() => onRemove(member)}
        className="text-red-500 hover:text-red-700">
        <X size={20} />
      </button>
    </div>
  )
}
