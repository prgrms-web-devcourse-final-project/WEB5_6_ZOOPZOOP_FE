'use client'

import { useState } from 'react'
import FileHeader from './FileHeader'
import { SortDirection } from '@tanstack/react-table'
import {
  getSortedGridFiles,
  getSortedTableFiles,
  SortKey
} from '@/features/archive/sort'

import { CustomTable } from '@/shared/ui/shadcn/CustomTable'
import { ArchiveColumn } from './ArchiveColumn'
import { gridFiles, tableFiles } from '@/entities/archive/file/model/mockdata'
import FileCard from './FileCard'
import { useFileViewMode } from '@/features/archive/switch-file-view/model/useSwitchFileView'
import { type FileData } from '@/entities/archive/file'

interface Props {
  fileList: FileData[]
}

function FileSection({ fileList }: Props) {
  // 백엔드에서 이름, 날짜 정렬 데이터 줌 -> 데이터 통신할 때 보내줘야됨
  const [sortKey, setSortKey] = useState<SortKey>('이름')
  // 기본값은 벡엔드에서 받음
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const { viewMode, onSwitchViewMode } = useFileViewMode()

  const sortedTableFiles = getSortedTableFiles(
    tableFiles,
    sortKey,
    sortDirection
  )
  const sortedGridFiles = getSortedGridFiles(gridFiles, sortKey, sortDirection)

  /* 체크박스 컨트롤 */
  const [checkedCardList, setCheckedCardList] = useState<number[]>([])

  const handleCheckbox = (cardId: number) => {
    if (checkedCardList.includes(cardId)) {
      setCheckedCardList(prev => prev.filter(id => id !== cardId))
    } else {
      setCheckedCardList(prev => [...prev, cardId])
    }
  }

  const onAllCheck = () => {
    const allCheckedList = sortedGridFiles.map(item => item.id)
    if (checkedCardList.length === allCheckedList.length) {
      setCheckedCardList([])
    } else {
      setCheckedCardList(allCheckedList)
    }
  }

  const fileCardView = () => {
    return (
      <div className="grid grid-cols-4 gap-4 w-full">
        {sortedGridFiles.map(
          ({
            id,
            title,
            category,
            createAt,
            imageUrl,
            sourceUrl,
            ownerProfileUrl,
            summary
          }) => {
            const isSelected = checkedCardList.includes(id)
            return (
              <FileCard
                summary={summary}
                key={id}
                id={id}
                title={title}
                category={category}
                createAt={createAt}
                imageUrl={imageUrl}
                sourceUrl={sourceUrl}
                ownerProfileUrl={ownerProfileUrl}
                isSelected={isSelected}
                onSelect={handleCheckbox}
              />
            )
          }
        )}
      </div>
    )
  }

  const tableView = () => {
    return (
      <CustomTable
        columns={ArchiveColumn}
        data={sortedTableFiles}
      />
    )
  }

  return (
    <>
      <FileHeader
        isChecked={checkedCardList.length > 0}
        isTableView={viewMode === 'list'}
        onChangeView={onSwitchViewMode}
        onSortChange={(key, direction) => {
          setSortKey(key)
          setSortDirection(direction)
        }}
        onAllCheck={onAllCheck}
      />
      {/* <div className="flex items-center justify-center">
        {viewMode === 'list' ? tableView() : fileCardView()}
      </div> */}
      {viewMode === 'list' ? tableView() : fileCardView()}
    </>
  )
}
export default FileSection
