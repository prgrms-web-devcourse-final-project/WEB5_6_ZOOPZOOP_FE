import { FileItem, SortKey } from './type'
import { sortFiles } from './sortUtils'
import { SortDirection } from '@tanstack/react-table'
import { FolderData } from '@/entities/archive/folder'

function formatFolderDataForSort(files: FolderData[]): FileItem[] {
  return files.map(f => ({ name: f.folderName, date: '0000-00-00' }))
}

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
