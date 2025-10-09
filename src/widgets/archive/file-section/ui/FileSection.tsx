'use client'

import { useSearchParams } from 'next/navigation'
import FileHeader from './FileHeader'
import TableView from './TableView'
import CardView from './CardView'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useArchiveFilesByPageQuery } from '@/entities/archive/file/model/queries'
import { SearchGetResponse } from '@/entities/archive/file/model/type'
import {
  useSelectFiles,
  useSortFile,
  useSwitchFileView
} from '@/features/archive'

interface Props {
  initialFileData: SearchGetResponse
  initialPage: number
  mode: 'archive' | 'trash'
  folderId: number
}

function FileSection({ initialFileData, initialPage, mode, folderId }: Props) {
  const searchParams = useSearchParams()
  const queryKeyword = searchParams.get('q') || ''

  //파일 뷰 선택
  const { viewMode, onSwitchViewMode } = useSwitchFileView()

  // 파일 정렬
  const { sort, handleSortClick } = useSortFile()

  // 파일 전체 선택
  const { selectedIds, handleSelect, handleSelectAll } = useSelectFiles()

  const currentPage = Number(searchParams.get('page')) || 1

  const isNonePagination = initialFileData.data.pageInfo.totalElements === 0

  const { data: filesQuery } = useArchiveFilesByPageQuery({
    query: {
      folderId,
      page: currentPage,
      isActive: false,
      size: 8,
      sort: `${sort.key},${sort.direction}`,
      keyword: queryKeyword
    },
    initialData: currentPage === initialPage ? initialFileData : undefined
  })

  const fileList = filesQuery?.data.items || []

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
        handleSelectAll={() => handleSelectAll(fileList)}
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
