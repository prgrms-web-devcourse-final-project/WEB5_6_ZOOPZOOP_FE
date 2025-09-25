'use client'

import { useMemo, useState } from 'react'
import FolderGrid from './FolderGrid'
import FolderHeader from './FolderHeader'
import { SortDirection } from '@tanstack/react-table'
import { folderData } from '@/entities/archive/model/mockdata'
import { getSortedFolders } from '@/features/archive/sort'

const SORT_KEY = '이름'

function FolderSection() {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedFolders = useMemo(
    () => getSortedFolders(folderData, SORT_KEY, sortDirection),
    [sortDirection]
  )
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
