'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { SelectedFolder } from './type'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'

export const useUrlUploadFolderState = () => {
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
    folderList,
    selectedFolder,
    handleSelectFolder
  }
}
