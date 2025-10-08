'use client'

import { useSearchParams } from 'next/navigation'
import FileHeader from './FileHeader'
import TableView from './TableView'
import CardView from './CardView'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useArchiveFilesByPageQuery } from '@/entities/archive/file/model/queries'
import { SearchGetResponse } from '@/entities/archive/file/model/type'
import { useSortFile, useSwitchFileView } from '@/features/archive'
import { useState } from 'react'

interface Props {
  initialFileData: SearchGetResponse
  initialPage: number
  mode: 'archive' | 'trash'
}

function FileSection({ initialFileData, initialPage, mode }: Props) {
  const searchParams = useSearchParams()
  const queryKeyword = searchParams.get('q') || ''
  const { viewMode, onSwitchViewMode } = useSwitchFileView()
  const { sort, handleSortClick } = useSortFile()
  const currentPage = Number(searchParams.get('page')) || 1
  const isNonePagination = initialFileData.data.pageInfo.totalElements === 0
  const { data: filesQuery } = useArchiveFilesByPageQuery({
    query: {
      folderId: 0,
      page: currentPage,
      isActive: false,
      size: 8,
      sort: `${sort.key},${sort.direction}`,
      keyword: queryKeyword
    },
    initialData: currentPage === initialPage ? initialFileData : undefined
  })
  const fileList = filesQuery?.data.items || []

  // mode에 따라 파일 선택
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleSelect = (cardId: number) => {
    setSelectedIds(
      prev =>
        prev.includes(cardId)
          ? prev.filter(id => id !== cardId) // 이미 있으면 해제
          : [...prev, cardId] // 없으면 추가
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === fileList.length) {
      // 이미 전체 선택된 상태면 → 전체 해제
      setSelectedIds([])
    } else {
      // 전체 선택
      setSelectedIds(fileList.map(file => file.dataSourceId))
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <FileHeader
        mode={mode}
        sortKey={sort.key}
        direction={sort.direction}
        isTableView={viewMode === 'list'}
        selectedIds={selectedIds}
        onChangeView={onSwitchViewMode}
        handleSortClick={handleSortClick}
        handleSelectAll={handleSelectAll}
      />
      <div className="flex-1">
        {viewMode === 'list' ? (
          <TableView
            mode={mode}
            fileList={fileList}
          />
        ) : (
          <CardView
            selectedIds={selectedIds}
            onSelect={handleSelect}
            mode={mode}
            fileList={fileList}
          />
        )}
      </div>
      {isNonePagination ? (
        <p>등록된 파일이 없습니다</p>
      ) : (
        <Pagination totalPages={initialFileData.data.pageInfo.totalPages} />
      )}
    </div>
  )
}

export default FileSection
