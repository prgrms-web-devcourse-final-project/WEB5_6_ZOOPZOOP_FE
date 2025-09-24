import { MoreVertical } from 'lucide-react'

interface Props {
  folderName: string
}

function FolderItem({ folderName }: Props) {
  return (
    <div className="flex justify-between bg-[#F9FAFB] rounded-sm px-3 py-3 hover:bg-gray-light-active hover:font-bold cursor-pointer">
      <p className="text-base text-gray-darker ">{folderName}</p>
      <button
        type="button"
        className="text-gray-dark">
        <MoreVertical />
      </button>
    </div>
  )
}
export default FolderItem
