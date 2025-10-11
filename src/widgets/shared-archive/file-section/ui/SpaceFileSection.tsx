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

interface Props {
  initialFileData: SearchSpaceFileGetResponse
  initialPage: number
  mode: SpaceFileMode
  spaceId: number
}

export default function SpaceFileSection({
  initialFileData,
  initialPage,
  mode,
  spaceId
}: Props) {
  const searchParams = useSearchParams()
  const queryKeyword = searchParams.get('q') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  // 뷰 전환, 정렬, 선택 훅
  const { viewMode, onSwitchViewMode } = useSwitchSpaceFileView()
  const { sort, toggleSort } = useSortFile()
  const { selectedIds, handleSelect, handleSelectAll } = useSelectSpaceFiles()

  // react-query
  const { data: filesQuery } = useSpaceFilesQuery({
    query: {
      spaceId,
      page: currentPage,
      isActive: mode === 'space',
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

      <div>
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

      {isEmpty ? (
        <p>등록된 파일이 없습니다.</p>
      ) : (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  )
}
