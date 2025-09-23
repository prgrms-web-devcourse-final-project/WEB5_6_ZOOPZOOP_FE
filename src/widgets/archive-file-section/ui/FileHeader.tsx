import { ArrowUp, Columns3, File, TextAlignJustifyIcon } from 'lucide-react'
import SwitchViewButton from './SwitchViewButton'

function FileHeader() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center ">
        <File
          size={24}
          className="text-gray-light-active"
        />
        <p className="text-lg font-bold text-gray-darker">파일</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex gap-2 items-center text-base rounded-sm p-1 cursor-pointer  hover:bg-gray-light-active hover:font-bold">
          <p>이름</p>
          <ArrowUp size={14} />
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-base rounded-sm p-1  cursor-pointer hover:bg-gray-light-active hover:font-bold">
          <p>날짜</p>
          <ArrowUp size={14} />
        </button>
        {/* 리스트로 변경 */}
        <SwitchViewButton
          icon={TextAlignJustifyIcon}
          isSelected={false}
        />
        {/* 카드로 변경 */}
        <SwitchViewButton
          icon={Columns3}
          isSelected={true}
        />
      </div>
    </div>
  )
}
export default FileHeader
