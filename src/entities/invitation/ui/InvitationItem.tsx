import Image from 'next/image'

interface Props {
  spaceName: string
  spaceThumbnailUrl: string
  acceptAction?: React.ReactNode
  cancelAction?: React.ReactNode
}

const InvitationItem = ({
  spaceName,
  spaceThumbnailUrl,
  acceptAction,
  cancelAction
}: Props) => {
  return (
    <li className="group px-4 py-2 hover:bg-slate-50/50 transition-colors">
      <div className="flex items-center gap-3">
        {spaceThumbnailUrl ? (
          <Image
            src={spaceThumbnailUrl}
            alt={spaceName}
            className="w-7 h-7 rounded-full object-cover"
            width={28}
            height={28}
          />
        ) : (
          <div
            className="w-7 h-7 rounded-full bg-slate-200 
                          flex items-center justify-center flex-shrink-0 text-slate-600 text-[11px] font-medium">
            {spaceName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-700 truncate">
            <span className="font-semibold text-slate-800">{spaceName}</span>
            <span>팀의 초대</span>
          </p>
        </div>
        <div className="flex gap-1 flex-shrink-0 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          {cancelAction}
          {acceptAction}
        </div>
      </div>
    </li>
  )
}
export default InvitationItem
