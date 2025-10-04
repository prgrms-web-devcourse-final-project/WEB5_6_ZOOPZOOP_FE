import { Columns3, File, TextAlignJustifyIcon } from 'lucide-react'
import { SortDirection } from '@tanstack/react-table'
import { SortButton, SortKey } from '@/features/archive/sort'
import { SwitchFileViewButton } from '@/features/archive/switch-file-view'
import MoveFileButton from '@/features/archive/move-file/ui/MoveFileButton'
import CopyToSpaceButton from '@/features/archive/copy-file/ui/CopyToSpaceButton'

import { DeleteFileButton } from '@/features/archive/delete-file'
import { CheckedFile } from '@/features/archive/move-file/model/type'

interface Props {
  sortKey: SortKey
  direction: SortDirection
  isTableView: boolean
  isChecked: boolean
  checkedCardList: CheckedFile[]
  onChangeView: () => void
  onAllCheck: () => void
  handleSortClick: (key: SortKey, direction: SortDirection) => void
}

function FileHeader({
  sortKey,
  direction,
  isTableView,
  checkedCardList,
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

        {/* 스페이스로 복사 버튼 */}
        <CopyToSpaceButton />

        {/* 파일 이동 버튼 */}
        <MoveFileButton checkedFileList={checkedCardList} />

        {/* 파일 삭제 버튼 */}
        <DeleteFileButton />
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
