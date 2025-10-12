import { useEffect, useState } from 'react'
import { SelectedFile } from './type'
import { useParams, useSearchParams } from 'next/navigation'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { SelectedFolder } from '../../upload-file/model/type'

export const useMoveFileModalState = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const folderIdFromUrl = params?.folderId
  const folderNameFromUrl = searchParams.get('name')
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data
  const defaultFolder = folderList?.find(item => item.folderName === 'default')
  const [selectedFolder, setSelectedFolder] = useState<SelectedFolder>({
    folderId: defaultFolder?.folderId ?? 0,
    folderName: defaultFolder?.folderName ?? ''
  })
  const [selectedSaveFolder, setSelectedSaveFolder] = useState<SelectedFolder>()
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

  const handleSelectFolder = (folderId: number, folderName: string) => {
    setSelectedFolder({ folderId, folderName })
  }

  const handleSelectSaveFolder = (folderId: number, folderName: string) =>
    setSelectedSaveFolder({
      folderId,
      folderName
    })

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

  useEffect(() => {
    if (folderIdFromUrl && folderNameFromUrl) {
      setSelectedFolder({
        folderId: Number(folderIdFromUrl),
        folderName: folderNameFromUrl
      })
    }
  }, [folderIdFromUrl, folderNameFromUrl])

  return {
    folderList,
    selectedFolder,
    selectedSaveFolder,
    selectedFiles,
    handleSelectFolder,
    handleSelectSaveFolder,
    onSelectFiles
  }
}
