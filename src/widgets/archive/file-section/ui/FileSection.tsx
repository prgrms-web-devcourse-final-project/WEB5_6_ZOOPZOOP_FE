'use client'

import { useState } from 'react'
import FileGrid from './FileGrid'
import FileHeader from './FileHeader'
import FileTable from './FileTable'
import { SortDirection } from '@tanstack/react-table'
import { gridFiles, tableFiles } from '@/entities/archive/model/mockdata'
import {
  getSortedGridFiles,
  getSortedTableFiles,
  SortKey
} from '@/features/archive/sort'

function FileSection() {
  const [isTableView, setIsTableView] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('이름')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedTableFiles = getSortedTableFiles(
    tableFiles,
    sortKey,
    sortDirection
  )
  const sortedGridFiles = getSortedGridFiles(gridFiles, sortKey, sortDirection)

  return (
    <div className="flex flex-col gap-4">
      <FileHeader
        isTableView={isTableView}
        onChangeView={setIsTableView}
        onSortChange={(key, direction) => {
          setSortKey(key)
          setSortDirection(direction)
        }}
      />
      {isTableView ? (
        <FileTable rowData={sortedTableFiles} />
      ) : (
        <FileGrid gridData={sortedGridFiles} />
      )}
    </div>
  )
}
export default FileSection
