'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FileHeader from './FileHeader'
import TableView from './TableView'
import CardView from './CardView'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useFileViewMode } from '@/features/archive/switch-file-view/model/useSwitchFileView'

import { SortDirection, SortKey } from '@/features/archive/sort'
import { CheckedFile } from '@/features/archive/move-file/model/type'
import { useArchiveFilesByPageQuery } from '@/entities/archive/file/model/queries'
import { SearchGetResponse } from '@/entities/archive/file/model/type'

interface Props {
  initialFileData: SearchGetResponse
  initialPage: number
}

function FileSection({ initialFileData, initialPage }: Props) {
  const searchParams = useSearchParams()
  const { viewMode, onSwitchViewMode } = useFileViewMode()

  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'createdAt',
    direction: 'desc'
  })

  const currentPage = Number(searchParams.get('page')) || 1
  const isNonePagination = initialFileData.data.pageInfo.totalElements === 0

  const { data: filesQuery } = useArchiveFilesByPageQuery({
    query: {
      folderId: 0,
      page: currentPage,
      isActive: false,
      size: 8,
      sort: `${sort.key},${sort.direction}`
    },
    initialData: currentPage === initialPage ? initialFileData : undefined
  })
  const fileList = filesQuery?.data.items || []

  const handleSortClick = (key: SortKey, newDirection: SortDirection) => {
    setSort({
      key,
      direction: newDirection
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <FileHeader
        sortKey={sort.key}
        direction={sort.direction}
        isTableView={viewMode === 'list'}
        onChangeView={onSwitchViewMode}
        handleSortClick={handleSortClick}
      />
      <div className="flex-1">
        {viewMode === 'list' ? (
          <TableView fileList={fileList} />
        ) : (
          <CardView fileList={fileList} />
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
