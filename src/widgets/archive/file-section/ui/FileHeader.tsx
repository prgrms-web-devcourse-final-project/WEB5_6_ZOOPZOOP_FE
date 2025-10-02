import { Columns3, File, TextAlignJustifyIcon } from 'lucide-react'
import { SortDirection } from '@tanstack/react-table'
import { SortButton, SortKey } from '@/features/archive/sort'
import { SwitchFileViewButton } from '@/features/archive/switch-file-view'
import MoveFileButton from '@/features/archive/move-file/ui/MoveFileButton'
import CopyToSpaceButton from '@/features/archive/copy-file/ui/CopyToSpaceButton'
import { CheckAllFilesButton } from '@/features/archive/check-file'
import { DeleteFileButton } from '@/features/archive/delete-file'

interface Props {
  sortKey: SortKey
  direction: SortDirection
  isTableView: boolean
  isChecked: boolean
  onChangeView: () => void
  onAllCheck: () => void
  handleSortClick: (key: SortKey, direction: SortDirection) => void
}

function FileHeader({
  sortKey,
  direction,
  isTableView,
  isChecked,
  onChangeView,
  handleSortClick,
  onAllCheck
}: Props) {
  return (
    <div className="flex  justify-between">
      <div className="flex items-center">
        <File
          size={24}
          className="text-gray-light-active"
        />
        <p className="text-lg font-bold text-gray-darker ml-2 mr-1">파일</p>

        {/* 체크 박스 선택하면 생김 */}
        {isChecked && (
          <>
            <CheckAllFilesButton onAllCheck={onAllCheck} />
            <CopyToSpaceButton />
            <MoveFileButton />
            <DeleteFileButton />
          </>
        )}
      </div>

      <div className="flex gap-2">
        <SortButton
          label="이름"
          direction={sortKey === '이름' ? direction : 'none'}
          onClick={() =>
            handleSortClick(
              '이름',
              sortKey === '이름' && direction === 'asc' ? 'desc' : 'asc'
            )
          }
        />
        <SortButton
          label="날짜"
          direction={sortKey === '날짜' ? direction : 'none'} // 이름 정렬할때 - 표시
          onClick={() =>
            handleSortClick(
              '날짜',
              sortKey === '날짜' && direction === 'asc' ? 'desc' : 'asc'
            )
          }
        />

        {/* 리스트 뷰 버튼 */}
        <SwitchFileViewButton
          icon={TextAlignJustifyIcon}
          isSelected={isTableView}
          onClick={onChangeView} // 리스트 뷰로 강제
        />

        {/* 카드 뷰 버튼 */}
        <SwitchFileViewButton
          icon={Columns3}
          isSelected={!isTableView}
          onClick={onChangeView} // 카드 뷰로 강제
        />
      </div>
    </div>
  )
}
export default FileHeader
