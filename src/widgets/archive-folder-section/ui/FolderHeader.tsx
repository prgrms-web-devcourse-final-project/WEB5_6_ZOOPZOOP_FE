import { ArrowUp, ChevronDown, Folder } from 'lucide-react'
function FolderHeader() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center ">
        <Folder
          size={24}
          className="text-gray-light-active"
        />
        <p className="text-lg font-bold text-gray-darker">폴더</p>
        <ChevronDown
          size={20}
          className="text-gray-dark"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex gap-2 items-center text-base rounded-sm p-1 cursor-pointer hover:bg-gray-light-active hover:font-bold">
          <p>이름</p>
          <ArrowUp size={14} />
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-base rounded-sm p-1  cursor-pointer hover:bg-gray-light-active hover:font-bold">
          <p>날짜</p>
          <ArrowUp size={14} />
        </button>
      </div>
    </div>
  )
}
export default FolderHeader
