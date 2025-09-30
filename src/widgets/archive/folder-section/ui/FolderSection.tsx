'use client'

import { useMemo, useState } from 'react'
import FolderGrid from './FolderGrid'
import FolderHeader from './FolderHeader'
import { SortDirection } from '@tanstack/react-table'

import { getSortedFolders } from '@/features/archive/sort'

import { FolderData } from '@/entities/archive/folder/model/type'

const SORT_KEY = '이름'

interface Props {
  folderList: FolderData[]
}
function FolderSection({ folderList }: Props) {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedFolders = useMemo(() => {
    if (folderList.length === 0) return [] // folderList가 비어있으면 함수 실행하지 않음
    return getSortedFolders(folderList, SORT_KEY, sortDirection)
  }, [folderList, sortDirection])

  return (
    <div className="flex flex-col gap-4 pb-5 border-b-1 border-gray-light-hover">
      <FolderHeader
        direction={sortDirection}
        onSortChange={setSortDirection}
      />
      <FolderGrid data={sortedFolders} />
    </div>
  )
}
export default FolderSection
