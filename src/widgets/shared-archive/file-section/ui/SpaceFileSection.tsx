'use client'

import { useSearchParams } from 'next/navigation'

import TableView from './TableView'
import CardView from './CardView'
import Pagination from '@/shared/ui/pagination/Pagination'

import SpaceFileHeader from './SpaceFileHeader'
import { SearchSpaceFileGetResponse } from '@/entities/shared-archive/model/type'
import { useSpaceFilesQuery } from '@/entities/shared-archive/model/queries'
import {
  SpaceFileMode,
  useSelectSpaceFiles,
  useSortFile,
  useSwitchSpaceFileView
} from '@/features/shared-archive'
import EmptySpaceFileList from '@/features/shared-archive/list/ui/EmptySpaceFileList'

interface Props {
  initialFileData: SearchSpaceFileGetResponse
  initialPage: number
  mode: SpaceFileMode
  spaceId: number
  currentSort?: string
}

export default function SpaceFileSection({
  initialFileData,
  initialPage,
  mode,
  spaceId,
  currentSort
}: Props) {
  const searchParams = useSearchParams()
  const queryKeyword = searchParams.get('q') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  // 뷰 전환, 정렬, 선택 훅
  const { viewMode, onSwitchViewMode } = useSwitchSpaceFileView()
  const { sort, toggleSort } = useSortFile()
  const { selectedIds, handleSelect, handleSelectAll } = useSelectSpaceFiles()

  useSpaceFilesQuery({
    query: {
      spaceId,
      page: currentPage,
      isActive: mode === 'space',
      size: 12,
      sort: currentSort,
      keyword: queryKeyword
    },
    initialData: currentPage === initialPage ? initialFileData : undefined
  })

  const fileList = initialFileData.data.items
  const pageInfo = initialFileData.data.pageInfo
  const totalPages = pageInfo.totalPages || 1
  const isEmpty = fileList.length === 0

  return (
    <div className="flex flex-col gap-2 ">
      <SpaceFileHeader
        mode={mode}
        sortKey={sort.key}
        direction={sort.direction}
        isTableView={viewMode === 'list'}
        selectedIds={selectedIds}
        onChangeView={onSwitchViewMode}
        toggleSort={toggleSort}
        handleSelectAll={() => handleSelectAll(fileList)}
      />

      <div className="min-h-[74vh] py-2">
        {isEmpty && <EmptySpaceFileList mode={mode} />}
        {viewMode === 'list' ? (
          <TableView
            mode={mode}
            fileList={fileList}
            selectedFiles={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
          />
        ) : (
          <CardView
            selectedIds={selectedIds}
            onSelect={handleSelect}
            mode={mode}
            fileList={initialFileData.data.items}
          />
        )}
      </div>

      {isEmpty ? (
        ''
      ) : (
        <div className="mt-3">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
