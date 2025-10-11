'use client'

import { useMemo, useState } from 'react'
import FolderGrid from './FolderGrid'
import FolderHeader from './FolderHeader'
import { SortDirection } from '@tanstack/react-table'
import { FolderData } from '@/entities/archive/folder/model/type'
import { getSortedFolders } from '@/features/archive'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'

const SORT_KEY = 'title'

interface Props {
  folderList: FolderData[]
}
function FolderSection({ folderList }: Props) {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedFolders = useMemo(() => {
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
