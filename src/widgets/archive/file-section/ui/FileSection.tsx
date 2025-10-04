'use client'

import { useState } from 'react'
import FileHeader from './FileHeader'
import { SortDirection } from '@tanstack/react-table'
import { SortKey } from '@/features/archive/sort'
import { useFileViewMode } from '@/features/archive/switch-file-view/model/useSwitchFileView'
import { type FileData } from '@/entities/archive/file'
import Pagination from '@/shared/ui/pagination/Pagination'
import { CheckedFile } from '@/features/archive/move-file/model/type'
import { PageInfo } from '@/entities/archive/file/model/type'
import TableView from './TableView'
import CardView from './CardView'

interface Props {
  folderId: number
  initialFileList: FileData[]
  initialPageInfo: PageInfo
  currentPage: number
}

function FileSection({
  initialFileList,
  initialPageInfo,
  folderId,
  currentPage
}: Props) {
  const { viewMode, onSwitchViewMode } = useFileViewMode()
  const [checkedCardList, setCheckedCardList] = useState<CheckedFile[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('이름')
  const [direction, setDirection] = useState<SortDirection>('asc')

  const isNonePagination = initialPageInfo.totalPages === 0

  // 정렬된 파일 데이터 불러오기

  const handleSortClick = (key: SortKey, newDirection: SortDirection) => {
    setSortKey(key)
    setDirection(newDirection)
  }

  /* 체크박스 컨트롤 */
  const handleCheckbox = (fileId: number) => {
    setCheckedCardList(prev => {
      const existing = prev.find(item => item.folderId === folderId)
      if (existing) {
        const alreadySelected = existing.fileId.includes(fileId)
        return prev.map(item =>
          item.folderId === folderId
            ? {
                ...item,
                fileId: alreadySelected
                  ? item.fileId.filter(id => id !== fileId)
                  : [...item.fileId, fileId]
              }
            : item
        )
      } else {
        return [...prev, { folderId, fileId: [fileId] }]
      }
    })
  }

  const onAllCheck = () => {
    const allIds = initialFileList.map(item => item.dataSourceId)

    setCheckedCardList(prev => {
      const existing = prev.find(item => item.folderId === folderId)
      if (existing && existing.fileId.length === allIds.length) {
        // 이미 다 선택된 경우 → 해제
        return prev.filter(item => item.folderId !== folderId)
      } else {
        // 전체 선택
        const filtered = prev.filter(item => item.folderId !== folderId)
        return [...filtered, { folderId, fileId: allIds }]
      }
    })
  }

  const currentCheckedIds =
    checkedCardList.find(item => item.folderId === folderId)?.fileId ?? []

  return (
    <>
      <FileHeader
        sortKey={sortKey}
        direction={direction}
        isChecked={currentCheckedIds.length > 0}
        isTableView={viewMode === 'list'}
        onChangeView={onSwitchViewMode}
        handleSortClick={handleSortClick}
        onAllCheck={onAllCheck}
        checkedCardList={checkedCardList}
      />

      {viewMode === 'list' ? (
        <TableView fileList={initialFileList} />
      ) : (
        <CardView fileList={initialFileList} />
      )}

      {isNonePagination ? (
        <p>등록된 파일이 없습니다</p>
      ) : (
        <Pagination totalPages={initialPageInfo.totalPages} />
      )}
    </>
  )
}
export default FileSection
