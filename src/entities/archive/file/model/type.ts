import { FolderData } from '../../folder'

export interface FileGetResponse {
  status: string
  msg: string
  data: {
    files: FileData[]
    folders: FolderData[]
  }
}

export interface FilePostResponse {
  status: string
  msg: string
  data: {
    dataSourceId: number
  }
}

export interface FileData {
  dataSourceId: number
  title: string
  createdAt: string
  summary: string
  sourceUrl: string
  imageUrl: string
  tags: string[]
  category: string
}

export type ArchiveColumnType = {
  id: string
  title: string
  category: string
  createdAt: string
  origin: string
}
