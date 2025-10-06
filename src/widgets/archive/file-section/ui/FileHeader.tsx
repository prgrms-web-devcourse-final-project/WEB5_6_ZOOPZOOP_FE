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

  onChangeView: () => void
  handleSortClick: (key: SortKey, direction: SortDirection) => void
}

function FileHeader({
  sortKey,
  direction,
  isTableView,

  onChangeView,
  handleSortClick
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
        <MoveFileButton />

        {/* 파일 삭제 버튼 */}
        <DeleteFileButton />
      </div>

      <div className="flex gap-2">
        <SortButton
          label="title"
          direction={sortKey === 'title' ? direction : 'none'}
          onClick={() =>
            handleSortClick(
              'title',
              sortKey === 'title' && direction === 'asc' ? 'desc' : 'asc'
            )
          }
        />

        <SortButton
          label="createdAt"
          direction={sortKey === 'createdAt' ? direction : 'none'} // title 정렬할때 - 표시
          onClick={() =>
            handleSortClick(
              'createdAt',
              sortKey === 'createdAt' && direction === 'asc' ? 'desc' : 'asc'
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
