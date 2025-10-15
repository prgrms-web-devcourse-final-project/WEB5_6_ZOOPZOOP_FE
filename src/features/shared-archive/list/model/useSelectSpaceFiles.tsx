import { FileData } from '@/entities/archive/file'
import { CheckedFile } from '@/features/archive/move-file/model/type'
import { useState } from 'react'

export const useSelectSpaceFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState<CheckedFile[]>([])

  const handleSelect = (dataSourceId: number, fileName: string) => {
    setSelectedFiles(
      prev =>
        prev?.some(file => file.dataSourceId === dataSourceId)
          ? prev.filter(file => file.dataSourceId !== dataSourceId) // 이미 있으면 해제
          : [...prev, { dataSourceId, fileName }] // 없으면 추가
    )
  }

  const handleSelectAll = (fileList: FileData[]) => {
    if (selectedFiles?.length === fileList.length) {
      // 이미 전체 선택된 상태면 → 전체 해제
      setSelectedFiles([])
    } else {
      // 전체 선택
      setSelectedFiles(
        fileList.map(file => ({
          dataSourceId: file.dataSourceId,
          fileName: file.title
        }))
      )
    }
  }

  return {
    selectedFiles,
    handleSelect,
    handleSelectAll
  }
}
