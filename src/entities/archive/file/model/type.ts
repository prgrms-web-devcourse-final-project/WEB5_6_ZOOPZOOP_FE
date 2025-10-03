import { APIResponse } from '@/shared/types'
import { FolderData } from '../../folder'

export type FileGetResponse = APIResponse<{
  files: FileData[]
  folders: FolderData[]
}>

export type FilePostResponse = APIResponse<{
  dataSourceId: number
}>

export interface FileData {
  dataSourceId: number
  title: string
  createdAt: string
  summary: string
  sourceUrl: string
  source: string
  imageUrl: string
  tags: string[]
  category: string
}

export interface PageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  sorted: string
}

export interface UseArchiveFilesByPageOptions {
  folderId: number
  page: number
  size: number
  enabled?: boolean
}

export interface SearchGetResponse {
  status: number
  msg: string
  data: FileData[]
  pageInfo: PageInfo
}

export interface FileSearchParams {
  folderId?: number
  page: number
  size: number
  title?: string
  isActive?: boolean
  sort?: string
}
