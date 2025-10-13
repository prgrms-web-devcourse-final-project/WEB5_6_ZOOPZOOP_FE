import { LuX } from 'react-icons/lu'

interface Props {
  member: string
  onRemove: (name: string) => void
}

export const MemberCard = ({ member, onRemove }: Props) => {
  return (
    <div className="group relative flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{member}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(member)}
        className="flex-shrink-0 p-1.5 rounded-md text-slate-400 0 group-hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
        aria-label={`${member} 제거`}>
        <LuX size={16} />
      </button>
    </div>
  )
}
