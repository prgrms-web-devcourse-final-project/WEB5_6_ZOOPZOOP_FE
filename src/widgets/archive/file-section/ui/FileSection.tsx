'use client'

import { useSearchParams } from 'next/navigation'
import FileHeader from './FileHeader'
import TableView from './TableView'
import CardView from './CardView'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useArchiveFilesByPageQuery } from '@/entities/archive/file/model/queries'
import { SearchGetResponse } from '@/entities/archive/file/model/type'
import { useSortFile, useSwitchFileView } from '@/features/archive'

interface Props {
  initialFileData: SearchGetResponse
  initialPage: number
  mode: 'archive' | 'trash'
}

function FileSection({ initialFileData, initialPage, mode }: Props) {
  const searchParams = useSearchParams()
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
      sort: `${sort.key},${sort.direction}`
    },
    initialData: currentPage === initialPage ? initialFileData : undefined
  })
  const fileList = filesQuery?.data.items || []

  // mode에 따라 파일 선태

  return (
    <div className="flex flex-col gap-2">
      <FileHeader
        mode={mode}
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
