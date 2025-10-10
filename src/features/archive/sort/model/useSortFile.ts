import { useState } from 'react'
import { SortKey, SortDirection } from './type'

export const useSortFile = () => {
  const [sort, setSort] = useState<{
    key: SortKey
    direction: SortDirection
  }>({
    key: 'createdAt',
    direction: 'desc'
  })

  const handleSortClick = (key: SortKey, newDirection: SortDirection) => {
    setSort({
      key,
      direction: newDirection
    })
  }

  return {
    sort,
    handleSortClick
  }
}
