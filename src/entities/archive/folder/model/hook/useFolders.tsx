'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchArchiveFolderClient,
  postArchiveFolderClient,
  deleteArchiveFolderClient,
  patchArchiveFolderClient
} from '../../api/folder.client'

export const useArchiveFolders = () => {
  const queryClient = useQueryClient()

  const foldersQuery = useQuery({
    queryKey: ['archiveFolders'],
    queryFn: fetchArchiveFolderClient,
    staleTime: 1000 * 60
  })

  const addFolder = useMutation({
    mutationFn: (folderName: string) => postArchiveFolderClient(folderName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFolders'] })
    }
  })

  const deleteFolder = useMutation({
    mutationFn: (folderId: number) => deleteArchiveFolderClient(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveFolders'] })
    }
  })

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
    foldersQuery,
    addFolder,
    deleteFolder,
    updateFolderName
  }
}
