'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  fetchArchiveFolderClient,
  postArchiveFolderClient
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

  return {
    foldersQuery,
    addFolder
  }
}
