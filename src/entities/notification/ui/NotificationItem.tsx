import { Check, X } from 'lucide-react'
import Image from 'next/image'

interface Props {
  name: string
  thumbnailUrl: string
  onSubmit: () => void
  onCancel: () => void
}

const NotificationItem = ({
  name,
  thumbnailUrl,
  onCancel,
  onSubmit
}: Props) => {
  return (
    <li className="group px-4 py-2 hover:bg-slate-50/50 transition-colors">
      <div className="flex items-center gap-3">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={name}
            className="w-7 h-7 rounded-full object-cover"
            width={50}
            height={50}
            priority
          />
        ) : (
          <div
            className="w-7 h-7 rounded-full bg-slate-200 
                          flex items-center justify-center flex-shrink-0 text-slate-600 text-[11px] font-medium">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-700 truncate">
            <span className="font-semibold text-slate-800">{name}</span>
            <span>팀의 초대</span>
          </p>
        </div>
        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onCancel}
            className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-orange-accent
                     transition-colors cursor-pointer"
            aria-label="거절">
            <X className="size-4" />
          </button>
          <button
            onClick={onSubmit}
            className="w-6 h-6 rounded flex items-center justify-center
                     text-slate-400 hover:text-green-500
                     transition-colors cursor-pointer"
            aria-label="수락">
            <Check className="size-4" />
          </button>
        </div>
      </div>
    </li>
  )
}
export default NotificationItem
