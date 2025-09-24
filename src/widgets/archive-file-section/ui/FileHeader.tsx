import { Columns3, File, TextAlignJustifyIcon } from 'lucide-react'
import SwitchViewButton from './SwitchViewButton'
import { Dispatch, SetStateAction, useState } from 'react'
import { SortButton, SortKey } from '@/features/archive-sort'
import { SortDirection } from '@tanstack/react-table'

interface Props {
  onChangeView: Dispatch<SetStateAction<boolean>>
  isTableView: boolean
  onSortChange: (key: SortKey, direction: SortDirection) => void
}

function FileHeader({ isTableView, onChangeView, onSortChange }: Props) {
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
    <div className="flex justify-between">
      <div className="flex gap-2 items-center ">
        <File
          size={24}
          className="text-gray-light-active"
        />
        <p className="text-lg font-bold text-gray-darker">파일</p>
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
        <SwitchViewButton
          icon={TextAlignJustifyIcon}
          isSelected={isTableView}
          onClick={() => onChangeView(true)} // 리스트 뷰로 강제
        />

        {/* 카드 뷰 버튼 */}
        <SwitchViewButton
          icon={Columns3}
          isSelected={!isTableView}
          onClick={() => onChangeView(false)} // 카드 뷰로 강제
        />
      </div>
    </div>
  )
}
export default FileHeader
