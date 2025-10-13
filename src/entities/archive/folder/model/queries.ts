'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchArchiveFolderClient,
  postArchiveFolderClient,
  deleteArchiveFolderClient,
  patchArchiveFolderClient
} from '../api/folder.client'

// 폴더 조회
export const useGetArchiveFoldersQuery = () => {
  const foldersQuery = useQuery({
    queryKey: ['archiveFolders'],
    queryFn: fetchArchiveFolderClient
    // staleTime: 1000 * 60
  })
  return {
    foldersQuery
  }
}

// 폴더 생성
export const usePostArchiveFolderQuery = () => {
  const queryClient = useQueryClient()
  const addFolder = useMutation({
    mutationFn: (folderName: string) => postArchiveFolderClient(folderName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFolders'] })
    }
  })

  return {
    addFolder
  }
}

// 폴더 삭제
export const useDeleteArchiveFolderQuery = () => {
  const queryClient = useQueryClient()
  const deleteFolder = useMutation({
    mutationFn: (folderId: number) => deleteArchiveFolderClient(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFolders'] })
    }
  })

  return {
    deleteFolder
  }
}

//폴더 이름 수정
export const useEditArchiveFolderNameQuery = () => {
  const queryClient = useQueryClient()
  const updateFolderName = useMutation({
    mutationFn: ({
      folderId,
      folderName
    }: {
      folderId: number
      folderName: string
    }) => patchArchiveFolderClient(folderId, folderName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFolders'] })
    }
  })

  return {
    updateFolderName
  }
}
