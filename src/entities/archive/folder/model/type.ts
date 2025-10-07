import { APIResponse } from '@/shared/types'

export type FolderResponse = APIResponse<FolderData[]>

export type FolderPostResponse = APIResponse<FolderData>

export type FolderPatchResponse = APIResponse<{
  folderName: string
}>

export interface FolderData {
  folderId: number
  folderName: string
}

export interface CreateFolder {
  folderName: string
}
