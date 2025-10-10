import { APIResponse, Pagination } from '@/shared/types'
import { FolderData } from '../../folder'

export type FileGetResponse = APIResponse<{
  files: FileData[]
  folders: FolderData[]
}>

export type FilePostResponse = APIResponse<{
  dataSourceId: number
}>

export interface SearchGetResponse {
  status: number
  msg: string
  data: { items: FileData[]; pageInfo: PageInfo }
}

export interface FileData {
  dataSourceId: number
  title: string
  dataCreatedDate: string
  summary: string
  sourceUrl: string
  source: string
  imageUrl: string
  tags: string[]
  category: string
}

export type EditFileRequest = Omit<FileData, 'dataCreatedDate'>

export interface PageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  sorted: string
}

export interface FileSearchParams {
  folderId?: number
  page?: number
  size?: number
  isActive?: boolean
  sort?: string
  keyword?: string
}
