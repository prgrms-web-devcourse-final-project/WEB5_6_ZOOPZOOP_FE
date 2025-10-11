'use client'

import { useSearchParams } from 'next/navigation'
import FileHeader from './FileHeader'
import TableView from './TableView'
import CardView from './CardView'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useArchiveFilesByPageQuery } from '@/entities/archive/file/model/queries'
import { SearchGetResponse } from '@/entities/archive/file/model/type'
import {
  FileMode,
  useSelectFiles,
  useSortFile,
  useSwitchFileView
} from '@/features/archive'

import EmptyArchiveFileList from '@/features/archive/list/ui/EmptyArchiveFileList'

interface Props {
  initialFileData: SearchGetResponse
  initialPage: number
  mode: FileMode
  folderId: number
}

export default function FileSection({
  initialFileData,
  initialPage,
  mode,
  folderId
}: Props) {
  const searchParams = useSearchParams()
  const queryKeyword = searchParams.get('q') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  // 뷰 전환, 정렬, 선택 훅
  const { viewMode, onSwitchViewMode } = useSwitchFileView()
  const { sort, toggleSort } = useSortFile()
  const { selectedIds, handleSelect, handleSelectAll } = useSelectFiles()

  // react-query
  const { data: filesQuery } = useArchiveFilesByPageQuery({
    query: {
      folderId,
      page: currentPage,
      isActive: mode === 'archive',
      size: 8,
      sort: `${sort.key},${sort.direction}`,
      keyword: queryKeyword
    },
    initialData: currentPage === initialPage ? initialFileData : undefined
  })

  const fileList = filesQuery?.data.items || []
  const totalPages = filesQuery?.data.pageInfo.totalPages || 1
  const isEmpty = fileList.length === 0

  return (
    <div className="flex flex-col gap-2 justify-center">
      <FileHeader
        mode={mode}
        sortKey={sort.key}
        direction={sort.direction}
        isTableView={viewMode === 'list'}
        selectedIds={selectedIds}
        onChangeView={onSwitchViewMode}
        toggleSort={toggleSort}
        handleSelectAll={() => handleSelectAll(fileList)}
      />

      <div>
        {!isEmpty && viewMode === 'list' ? (
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

      {isEmpty ? (
        <EmptyArchiveFileList />
      ) : (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  )
}
