'use client'

import { useState } from 'react'
import FileHeader from './FileHeader'
import { SortDirection } from '@tanstack/react-table'
import { SortKey } from '@/features/archive/sort'

import { CustomTable } from '@/shared/ui/shadcn/CustomTable'
import { ArchiveColumn } from './ArchiveColumn'
// import { gridFiles, tableFiles } from '@/entities/archive/file/model/mockdata'
import FileCard from './FileCard'
import { useFileViewMode } from '@/features/archive/switch-file-view/model/useSwitchFileView'
import { type FileData } from '@/entities/archive/file'

interface Props {
  fileList?: FileData[]
}

function FileSection({ fileList }: Props) {
  // 백엔드에서 이름, 날짜 정렬 데이터 줌 -> 데이터 통신할 때 보내줘야됨
  const [sortObj, setSortObj] = useState<{
    key: SortKey
    direction: SortDirection
  } | null>(null)

  const { viewMode, onSwitchViewMode } = useFileViewMode()

  /* 체크박스 컨트롤 ->fileList의 id만 뽑아서 사용  */
  const [checkedCardList, setCheckedCardList] = useState<number[]>([])

  const handleCheckbox = (cardId: number) => {
    if (checkedCardList.includes(cardId)) {
      setCheckedCardList(prev => prev.filter(id => id !== cardId))
    } else {
      setCheckedCardList(prev => [...prev, cardId])
    }
  }

  const onAllCheck = () => {
    const allCheckedList = fileList!.map(item => item.dataSourceId)
    if (checkedCardList.length === allCheckedList.length) {
      setCheckedCardList([])
    } else {
      setCheckedCardList(allCheckedList)
    }
  }

  const fileCardView = () => {
    return (
      <div className="grid grid-cols-4 gap-4 w-full">
        {fileList!.map(
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

  // const tableView = () => {
  //   return (
  //     <CustomTable
  //       columns={ArchiveColumn}
  //       data={fileList}
  //     />
  //   )
  // }

  return (
    <>
      <FileHeader
        isChecked={checkedCardList.length > 0}
        isTableView={viewMode === 'list'}
        onChangeView={onSwitchViewMode}
        onSortChange={(key, direction) => {
          // setSortKey(key)
          // setSortDirection(direction)
        }}
        onAllCheck={onAllCheck}
      />
      {/* <div className="flex items-center justify-center">
        {viewMode === 'list' ? tableView() : fileCardView()}
      </div> */}
      {/* {viewMode === 'list' ? tableView() : fileCardView()} */}
      {fileList ? fileCardView() : <p>등록된 파일 정보가 없습니다</p>}
    </>
  )
}
export default FileSection
