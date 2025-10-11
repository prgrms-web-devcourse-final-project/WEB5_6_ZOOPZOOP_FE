'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { SelectedFolder } from './type'

export const useUrlUploadFolderState = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const folderIdFromUrl = params?.folderId
  const folderNameFromUrl = searchParams.get('name')

  const [selectedFolder, setSelectedFolder] = useState<SelectedFolder>()

  // 폴더 선택 핸들러
  const handleSelectFolder = (folderId: number, folderName: string) => {
    setSelectedFolder({ folderId, folderName })
  }

  // URL에 folderId, name이 있으면 초기 선택 상태로 세팅
  useEffect(() => {
    if (folderIdFromUrl && folderNameFromUrl) {
      setSelectedFolder({
        folderId: Number(folderIdFromUrl),
        folderName: folderNameFromUrl
      })
    }
  }, [folderIdFromUrl, folderNameFromUrl])

  return {
    selectedFolder,
    handleSelectFolder
  }
}
