'use client'

import { useState } from 'react'
import FolderGrid from './FolderGrid'
import FolderHeader from './FolderHeader'
import { SortDirection } from '@tanstack/react-table'
import { folderData } from '@/entities/archive/model/mockdata'
import { getSortedFolders, SortKey } from '@/features/archive/sort'

function FolderSection() {
  const [sortKey, setSortKey] = useState<SortKey>('이름')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedFolders = getSortedFolders(folderData, sortKey, sortDirection)
  return (
    <div className="flex flex-col gap-4 pb-5 border-b-1 border-gray-light-hover">
      <FolderHeader
        onSortChange={(key, direction) => {
          setSortKey(key)
          setSortDirection(direction)
        }}
      />
      <FolderGrid data={sortedFolders} />
    </div>
  )
}
export default FolderSection
