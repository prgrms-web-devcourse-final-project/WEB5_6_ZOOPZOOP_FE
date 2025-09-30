import { Columns3, File, TextAlignJustifyIcon } from 'lucide-react'

import { useState } from 'react'
import { SortDirection } from '@tanstack/react-table'
import { SortButton, SortKey } from '@/features/archive/sort'
import { SwitchFileViewButton } from '@/features/archive/switch-file-view'

import MoveFileButton from '@/features/archive/move-file/ui/MoveFileButton'
import CopyToSpaceButton from '@/features/archive/copy-file/ui/CopyToSpaceButton'
import { CheckAllFilesButton } from '@/features/archive/check-file'
import { DeleteFileButton } from '@/features/archive/delete-file'

interface Props {
  isTableView: boolean
  isChecked: boolean
  onChangeView: () => void
  onAllCheck: () => void
  onSortChange: (key: SortKey, direction: SortDirection) => void
}

function FileHeader({
  isTableView,
  isChecked,
  onChangeView,
  onSortChange,
  onAllCheck
}: Props) {
  const [directionByColumn, setDirectionByColumn] = useState({
    이름: 'asc' as 'asc' | 'desc',
    날짜: 'asc' as 'asc' | 'desc'
  })

  const [sortKey, setSortKey] = useState<SortKey>('이름')

  const handleSortClick = (label: SortKey) => {
    // 클릭한 컬럼의 방향 토글
    const newDirection = directionByColumn[label] === 'asc' ? 'desc' : 'asc'

    setDirectionByColumn(prev => ({
      ...prev,
      [label]: newDirection
    }))

    // 마지막 클릭 컬럼을 현재 정렬 기준으로 지정
    setSortKey(label)
    onSortChange(label, newDirection)
  }

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
          direction={sortKey === '이름' ? directionByColumn['이름'] : 'none'}
          onClick={() => handleSortClick('이름')}
        />
        <SortButton
          label="날짜"
          direction={sortKey === '날짜' ? directionByColumn['날짜'] : 'none'}
          onClick={() => handleSortClick('날짜')}
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
