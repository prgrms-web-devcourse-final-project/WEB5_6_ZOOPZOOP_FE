'use client'

import { useState } from 'react'
import FileHeader from './FileHeader'
import { SortDirection } from '@tanstack/react-table'
import { SortKey } from '@/features/archive/sort'
import { CustomTable } from '@/shared/ui/shadcn/CustomTable'
import { ArchiveColumn } from './ArchiveColumn'
import FileCard from './FileCard'
import { useFileViewMode } from '@/features/archive/switch-file-view/model/useSwitchFileView'
import { ArchiveColumnType, type FileData } from '@/entities/archive/file'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useSearchFiles } from '@/features/archive/search-file/model/hook/useSearchFiles'
import { PageInfo } from '@/features/archive/search-file/model/type'

interface Props {
  initialFileList: FileData[]
  initialPageInfo: PageInfo
}

function FileSection({ initialFileList, initialPageInfo }: Props) {
  const { viewMode, onSwitchViewMode } = useFileViewMode()
  const [fileList, setFileList] = useState<FileData[] | null>(initialFileList)
  const [checkedCardList, setCheckedCardList] = useState<number[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('이름')
  const [direction, setDirection] = useState<SortDirection>('asc')

  // 페이지네이션도 관리 (예: 기본값 1페이지, 20개)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(8)

  // 정렬된 파일 데이터 불러오기
  const { data, isLoading, error } = useSearchFiles({
    // sort: `${sortKey},${direction}`,
    sort: `이름,asc`,
    page,
    size
  })

  const handleSortClick = (key: SortKey, newDirection: SortDirection) => {
    setSortKey(key)
    setDirection(newDirection)
  }

  /* 체크박스 컨트롤 ->initialFileList의 id만 뽑아서 사용  */

  const handleCheckbox = (cardId: number) => {
    if (checkedCardList.includes(cardId)) {
      setCheckedCardList(prev => prev.filter(id => id !== cardId))
    } else {
      setCheckedCardList(prev => [...prev, cardId])
    }
  }

  const onAllCheck = () => {
    const allCheckedList = initialFileList!.map(item => item.dataSourceId)
    if (checkedCardList.length === allCheckedList.length) {
      setCheckedCardList([])
    } else {
      setCheckedCardList(allCheckedList)
    }
  }

  const fileCardView = () => {
    return (
      <div className="grid grid-cols-4 gap-4 w-full">
        {initialFileList!.map(
          ({
            dataSourceId,
            title,
            category,
            createdAt,
            imageUrl,
            sourceUrl,
            tags,
            summary
          }) => {
            const isSelected = checkedCardList.includes(dataSourceId)
            return (
              <FileCard
                key={dataSourceId}
                id={dataSourceId}
                tags={tags}
                summary={summary}
                title={title}
                category={category}
                createdAt={createdAt}
                imageUrl={imageUrl}
                sourceUrl={sourceUrl}
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
    const tableData: ArchiveColumnType[] = initialFileList!.map(item => ({
      id: item.dataSourceId.toString(),
      title: item.title,
      category: item.category,
      createdAt: item.createdAt,
      origin: item.source
    }))

    return (
      <CustomTable
        columns={ArchiveColumn}
        data={tableData}
      />
    )
  }

  return (
    <>
      <FileHeader
        sortKey={sortKey}
        direction={direction}
        isChecked={checkedCardList.length > 0}
        isTableView={viewMode === 'list'}
        onChangeView={onSwitchViewMode}
        handleSortClick={handleSortClick}
        onAllCheck={onAllCheck}
      />

      {viewMode === 'list' ? tableView() : fileCardView()}
      {initialPageInfo.totalPages >= 0 && (
        <Pagination totalPages={initialPageInfo.totalPages} />
      )}
    </>
  )
}
export default FileSection
