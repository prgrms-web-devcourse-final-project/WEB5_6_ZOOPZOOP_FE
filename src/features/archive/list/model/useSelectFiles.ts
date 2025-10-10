import { FileData } from '@/entities/archive/file'
import { useState } from 'react'

export const useSelectFiles = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleSelect = (cardId: number) => {
    setSelectedIds(
      prev =>
        prev.includes(cardId)
          ? prev.filter(id => id !== cardId) // 이미 있으면 해제
          : [...prev, cardId] // 없으면 추가
    )
  }

  const handleSelectAll = (fileList: FileData[]) => {
    if (selectedIds.length === fileList.length) {
      // 이미 전체 선택된 상태면 → 전체 해제
      setSelectedIds([])
    } else {
      // 전체 선택
      setSelectedIds(fileList.map(file => file.dataSourceId))
    }
  }

  return {
    selectedIds,
    handleSelect,
    handleSelectAll
  }
}
