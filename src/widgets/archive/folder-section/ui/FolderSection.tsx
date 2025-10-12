'use client'

import { useMemo, useState } from 'react'
import FolderGrid from './FolderGrid'
import FolderHeader from './FolderHeader'
import { SortDirection } from '@tanstack/react-table'
import { FolderData } from '@/entities/archive/folder/model/type'
import { getSortedFolders } from '@/features/archive'
import { useSearchParams } from 'next/navigation'

const SORT_KEY = 'title'

interface Props {
  folderList: FolderData[]
}
function FolderSection({ folderList }: Props) {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const searchParams = useSearchParams()
  const folder = searchParams.get('name')
  const activeFolderName = folder ? decodeURIComponent(String(folder)) : ''

  const sortedFolders = useMemo(() => {
    // 1️이름순 정렬
    const sorted = getSortedFolders(folderList, SORT_KEY, sortDirection)

    // 2️default, active 폴더 찾음
    const defaultFolder = sorted.find(f => f.folderName === 'default')
    const activeFolder = sorted.find(f => f.folderName === activeFolderName)

    // 3️중복 제외한 나머지 폴더
    const remainingFolders = sorted.filter(
      f => f.folderName !== 'default' && f.folderName !== activeFolderName
    )

    // default  ->  active -> 나머지
    const reordered = []
    if (defaultFolder) reordered.push(defaultFolder)
    if (activeFolder && activeFolder.folderName !== 'default')
      reordered.push(activeFolder)
    reordered.push(...remainingFolders)

    return reordered
  }, [folderList, sortDirection, activeFolderName])

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
