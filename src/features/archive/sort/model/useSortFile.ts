import { useState, useEffect } from 'react'
import { SortKey, SortDirection } from './type'

export const useSortFile = (
  onSortChange?: (
    sort: { key: SortKey; direction: SortDirection } | null
  ) => void
) => {
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'createdAt',
    direction: 'desc'
  })

  const toggleSort = (key: SortKey) => {
    setSort(prev => {
      //같은 키 클릭 시 asc ↔ desc 토글
      if (prev.key === key) {
        const nextDirection: SortDirection =
          prev.direction === 'asc' ? 'desc' : 'asc'
        return { key, direction: nextDirection }
      }

      // 다른 키 클릭 시 새 키 asc로 설정
      // 이전 키는 자동으로 none 상태로 간주됨
      return { key, direction: 'asc' }
    })
  }

  useEffect(() => {
    if (onSortChange) {
      if (sort.direction === 'none') {
        onSortChange(null)
      } else {
        onSortChange(sort)
      }
    }
  }, [sort, onSortChange])

  return {
    sort,
    toggleSort
  }
}
