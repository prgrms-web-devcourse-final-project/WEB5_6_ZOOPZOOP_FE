import { Columns3, File, TextAlignJustifyIcon } from 'lucide-react'

import { SpaceFileMode } from '@/features/shared-archive/list/model/type'
import MoveToSpaceTrashButton from '@/features/shared-archive/move-to-trash/ui/MoveToSpaceTrashButton'
import { SwitchFileViewButton } from '@/features/shared-archive/switch-file-view'
import SpaceSortButton from '@/features/shared-archive/sort/ui/SpaceSortButton'
import { SortDirection, SortKey } from '@/features/shared-archive/sort'
import { DeleteSpaceFileButton } from '@/features/shared-archive/delete-file'
import { RestoreSpaceFileButton } from '@/features/shared-archive/restore-file'

interface Props {
  sortKey: SortKey
  direction: SortDirection
  isTableView: boolean
  selectedIds: number[]
  mode: SpaceFileMode
  onChangeView: () => void
  toggleSort: (key: SortKey) => void
  handleSelectAll: () => void
}

function SpaceFileHeader({
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

        {mode === 'space' && (
          <>
            <button
              type="button"
              onClick={handleSelectAll}
              className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white border-r-2">
              전체 선택
            </button>
            <MoveToSpaceTrashButton
              mode="space"
              dataSourceIds={selectedIds}
            />
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
            <RestoreSpaceFileButton selectedIds={selectedIds} />
            <DeleteSpaceFileButton selectedIds={selectedIds} />
          </>
        )}
      </div>

      <div className="flex gap-2">
        <SpaceSortButton
          label="title"
          direction={sortKey === 'title' ? direction : 'none'}
          onClick={toggleSort}
        />
        <SpaceSortButton
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
export default SpaceFileHeader
