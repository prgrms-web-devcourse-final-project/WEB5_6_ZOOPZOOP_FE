import { FileData } from '@/entities/archive/file'

export interface SearchGetResponse {
  status: string
  msg: string
  data: FileData[]
  pageInfo: PageInfo
}

export interface PageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  sorted: 'createdAt,desc'
}

export interface SearchQuery {
  folderId?: number
  page: number
  size: number
  title?: string
  isActive?: boolean
  sort?: string
}
