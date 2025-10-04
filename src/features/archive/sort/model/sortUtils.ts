import { SortDirection } from '@tanstack/react-table'
import { FileItem, SortKey } from './type'

// 한글 여부 체크 함수
function isKorean(text: string) {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text)
}

export function sortFiles(
  files: FileItem[],
  sortBy: SortKey,
  direction: SortDirection
): FileItem[] {
  return [...files].sort((a, b) => {
    let compareValue = 0

    if (sortBy === '이름') {
      const aIsKo = isKorean(a.name)
      const bIsKo = isKorean(b.name)

      if (aIsKo && !bIsKo)
        compareValue = -1 // 한글 우선
      else if (!aIsKo && bIsKo) compareValue = 1
      else {
        // 둘 다 한글이거나 둘 다 영어면 localeCompare
        // 한국어 우선 비교, 같으면 영어 비교
        compareValue =
          a.name.localeCompare(b.name, 'ko') ||
          a.name.localeCompare(b.name, 'en')
      }
    } else if (sortBy === '날짜') {
      compareValue = new Date(a.date).getTime() - new Date(b.date).getTime()
    }

    return direction === 'asc' ? compareValue : -compareValue
  })
}
