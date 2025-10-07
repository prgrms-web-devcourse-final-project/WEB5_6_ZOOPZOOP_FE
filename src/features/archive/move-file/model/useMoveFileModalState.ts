import { useState } from 'react'
import { SelectedFile } from './type'

export const useMoveFileModalState = () => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)
  const [selectedSaveFolder, setSelectedSaveFolder] = useState<number | null>(
    null
  )
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

  const handleSelectFolder = (id: number) => setSelectedFolder(id)
  const handleSelectSaveFolder = (id: number) => setSelectedSaveFolder(id)

  const onSelectFiles = ({
    folderId,
    folderName,
    fileId,
    fileName
  }: {
    folderId: number
    folderName: string
    fileId: number
    fileName: string
  }) => {
    setSelectedFiles(prev => {
      const folder = prev.find(f => f.folderId === folderId)

      // 폴더가 이미 선택 목록에 있을때
      if (folder) {
        const exists = folder.files.some(f => f.fileId === fileId)

        //파일이 이미 있을 경우 -> 선택 해제
        if (exists) {
          const updated = folder.files.filter(f => f.fileId !== fileId)
          //해당 파일만 제외한 새 배열 생성
          if (updated.length === 0)
            return prev.filter(f => f.folderId !== folderId)
          return prev.map(f =>
            f.folderId === folderId ? { ...f, files: updated } : f
          )
        }

        // 파일이 없는 경우 -> 선택 추가
        return prev.map(f =>
          f.folderId === folderId
            ? { ...f, files: [...f.files, { fileId, fileName }] }
            : f
        )
      }
      // 폴더 자체가 아직 선택 목록에 없는 경우 -> 새 폴더 추가
      return [...prev, { folderId, folderName, files: [{ fileId, fileName }] }]
    })
  }

  return {
    selectedFolder,
    selectedSaveFolder,
    selectedFiles,
    handleSelectFolder,
    handleSelectSaveFolder,
    onSelectFiles
  }
}
