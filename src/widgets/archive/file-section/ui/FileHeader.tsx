import { Columns3, File, TextAlignJustifyIcon } from 'lucide-react'
import { SwitchFileViewButton } from '@/features/archive/switch-file-view'
import MoveFileButton from '@/features/archive/move-file/ui/MoveFileButton'
import RestoreButton from '@/features/archive/restore-file/ui/RestoreButton'
import {
  SortButton,
  SortKey,
  DeleteFileButton,
  MoveToTrashButton,
  SortDirection,
  FileMode
} from '@/features/archive'
import { CopyToSpaceButton } from '@/features/shared-archive'

interface Props {
  sortKey: SortKey
  direction: SortDirection
  isTableView: boolean
  selectedIds: number[]
  mode: FileMode
  onChangeView: () => void
  toggleSort: (key: SortKey) => void
  handleSelectAll: () => void
}

function FileHeader({
  sortKey,
  direction,
  isTableView,
  mode,
  selectedIds,
  onChangeView,
  toggleSort,
  handleSelectAll
}: Props) {
  return (
    <div className="flex  justify-between">
      <div className="flex items-center">
        <File
          size={24}
          className="text-gray-light-active"
        />
        <p className="text-lg font-bold text-gray-darker ml-2 mr-1">파일</p>

        {mode === 'archive' && (
          <>
            {/* 스페이스로 복사 버튼 */}
            <CopyToSpaceButton />

            {/* 파일 이동 버튼 */}
            <MoveFileButton />

            {/* 파일 휴지통으로 이동 버튼 */}
            <MoveToTrashButton />
          </>
        )}

        {mode === 'trash' && (
          <>
            <button
              type="button"
              onClick={handleSelectAll}
              className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white border-r-2">
              전체 선택
            </button>
            <RestoreButton selectedIds={selectedIds} />
            <DeleteFileButton selectedIds={selectedIds} />
          </>
        )}
      </div>

      <div className="flex gap-2">
        <SortButton
          label="title"
          direction={sortKey === 'title' ? direction : 'none'}
          onClick={toggleSort}
        />
        <SortButton
          label="createdAt"
          direction={sortKey === 'createdAt' ? direction : 'none'}
          onClick={toggleSort}
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
