import { tw } from '@/shared/lib'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Props {
  folderName: string
  isUndo: boolean
}

function FolderItem({ folderName, isUndo }: Props) {
  return (
    <>
      <Link href={!isUndo ? `/archive/${folderName}` : '/archive'}>
        <div
          className={tw(
            'flex justify-between bg-[#F9FAFB] rounded-sm px-3 py-3 hover:bg-gray-light-active hover:font-bold cursor-pointer',
            isUndo
              ? 'bg-orange-accent text-gray-darker hover:bg-green-normal'
              : ''
          )}>
          <p className="text-base text-gray-darker ">{folderName}</p>
          <button
            type="button"
            className="text-gray-dark">
            <MoreVertical />
          </button>
        </div>
      </Link>
    </>
  )
}
export default FolderItem
