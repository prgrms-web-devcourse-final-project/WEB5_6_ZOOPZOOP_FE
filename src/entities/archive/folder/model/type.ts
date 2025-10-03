import { APIResponse } from '@/shared/types'

export type FolderResponse = APIResponse<FolderData[]>

// export type FolderResponse = {
//   status: string
//   msg: string
//   data: FolderData[]
// }

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
