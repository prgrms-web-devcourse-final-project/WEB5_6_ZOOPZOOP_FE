import { ArchiveColumnType } from '@/widgets/archive-file-section/ui/ArchiveColumn'
import { FileItem, FolderData, GridData, SortKey } from './sortType'
import { sortFiles } from './sortUtils'
import { SortDirection } from '@tanstack/react-table'

function formatTableFilesForSort(files: ArchiveColumnType[]): FileItem[] {
  return files.map(f => ({ name: f.title, date: f.createdAt }))
}

function formatGridFilesForSort(files: GridData[]): FileItem[] {
  return files.map(f => ({ name: f.title, date: f.createAt.toISOString() }))
}
function formatFolderDataForSort(files: FolderData[]): FileItem[] {
  return files.map(f => ({ name: f.name, date: '0000-00-00' }))
}

export const getSortedTableFiles = (
  files: ArchiveColumnType[],
  sortKey: SortKey,
  sortDirection: SortDirection
) => {
  const sortedData = sortFiles(
    formatTableFilesForSort(files),
    sortKey,
    sortDirection
  )

  return sortedData.map((file, index) => ({
    id: files[index].id, // 기존 id 유지
    title: file.name,
    category: files[index].category,
    createdAt: file.date,
    origin: files[index].origin
  }))
}

export const getSortedGridFiles = (
  gridFiles: GridData[],
  sortKey: SortKey,
  sortDirection: SortDirection
) => {
  const sortedData = sortFiles(
    formatGridFilesForSort(gridFiles),
    sortKey,
    sortDirection
  )
  return sortedData.map((file, index) => ({
    id: gridFiles[index].id,
    title: file.name,
    category: gridFiles[index].category,
    createAt: new Date(file.date),
    imageUrl: gridFiles[index].imageUrl,
    sourceUrl: gridFiles[index].sourceUrl,
    ownerProfileUrl: gridFiles[index].ownerProfileUrl,
    isSelected: gridFiles[index].isSelected
  }))
}

export const getSortedFolders = (
  folderData: FolderData[],
  sortKey: SortKey,
  sortDirection: SortDirection
) => {
  const sortedData = sortFiles(
    formatFolderDataForSort(folderData),
    sortKey,
    sortDirection
  )
  return sortedData.map((folder, index) => ({
    id: folderData[index].id,
    name: folder.name
  }))
}
