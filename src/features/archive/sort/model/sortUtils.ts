import { SortDirection } from '@tanstack/react-table'
import { SortKey } from './type'
import { FolderData } from '@/entities/archive/folder'

// 한글 여부 체크 함수
function isKorean(text: string) {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text)
}

function sortFiles(
  files: FolderData[],
  sortBy: SortKey,
  direction: SortDirection
): FolderData[] {
  return [...files].sort((a, b) => {
    let compareValue = 0

    if (sortBy === 'title') {
      const aIsKo = isKorean(a.folderName)
      const bIsKo = isKorean(b.folderName)

      if (aIsKo && !bIsKo)
        compareValue = -1 // 한글 우선
      else if (!aIsKo && bIsKo) compareValue = 1
      else {
        // 둘 다 한글이거나 둘 다 영어면 localeCompare
        // 한국어 우선 비교, 같으면 영어 비교
        compareValue =
          a.folderName.localeCompare(b.folderName, 'ko') ||
          a.folderName.localeCompare(b.folderName, 'en')
      }
    }

    return direction === 'asc' ? compareValue : -compareValue
  })
}

export const getSortedFolders = (
  folderData: FolderData[] = [],
  sortKey: SortKey,
  sortDirection: SortDirection
) => {
  return sortFiles(folderData, sortKey, sortDirection)
}
