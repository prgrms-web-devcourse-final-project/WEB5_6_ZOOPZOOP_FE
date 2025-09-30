import { ArchiveColumnType, GridDataType } from '@/entities/archive/file'
import { FileItem, SortKey } from './sortType'
import { sortFiles } from './sortUtils'
import { SortDirection } from '@tanstack/react-table'
import { FolderData } from '@/entities/archive/folder'

function formatTableFilesForSort(files: ArchiveColumnType[]): FileItem[] {
  return files.map(f => ({ name: f.title, date: f.createdAt }))
}

function formatGridFilesForSort(files: GridDataType[]): FileItem[] {
  return files.map(f => ({ name: f.title, date: f.createAt.toISOString() }))
}
function formatFolderDataForSort(files: FolderData[]): FileItem[] {
  return files.map(f => ({ name: f.folderName, date: '0000-00-00' }))
}

// api 통신해야됨
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
    id: files[index].id,
    title: file.name,
    category: files[index].category,
    createdAt: file.date,
    origin: files[index].origin
  }))
}

// api 통신해야됨
export const getSortedGridFiles = (
  gridFiles: GridDataType[],
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
    isSelected: gridFiles[index].isSelected,
    summary: gridFiles[index].summary
  }))
}

// api 통신해야됨
export const getSortedFolders = (
  folderData: FolderData[] = [],
  sortKey: SortKey,
  sortDirection: SortDirection
) => {
  const sortedData = sortFiles(
    formatFolderDataForSort(folderData),
    sortKey,
    sortDirection
  )

  return sortedData.map((folder, index) => ({
    folderId: folderData[index].folderId,
    folderName: folder.name
  }))
}
