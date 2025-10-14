import { useState, useEffect } from 'react'
import { SortKey, SortDirection } from './type'
import { useRouter } from 'next/navigation'

export const useSortFile = (
  onSortChange?: (
    sort: { key: SortKey; direction: SortDirection } | null
  ) => void
) => {
  const router = useRouter()
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'createdAt',
    direction: 'desc'
  })

  const toggleSort = (key: SortKey) => {
    // nextDirection 계산
    let nextDirection: SortDirection
    if (sort.key === key) {
      nextDirection = sort.direction === 'asc' ? 'desc' : 'asc'
    } else {
      nextDirection = 'asc'
    }

    // 상태 업데이트
    setSort({ key, direction: nextDirection })

    // 페이지 이동
    router.push(`archive?sort=${key},${nextDirection}`)
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
