import { PageInfo } from '@/entities/archive/file'
import { APIResponse } from '@/shared/types'

export interface SpaceFileByPageRequest {
  spaceId?: number
  page?: number
  size?: number
  isActive?: boolean
  sort?: string
  keyword?: string
}

export interface SpaceFileByFolderRequest {
  spaceId?: number
  folderId?: number
}
export interface SpaceFileData {
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

export interface SearchSpaceFileGetResponse {
  status: number
  msg: string
  data: { items: SpaceFileData[]; pageInfo: PageInfo }
}

export interface SpaceFileByFolder {
  files: SpaceFileData[]
  folderId: number
  folderName: string
}

export type SpaceFileByFolderGetResponse = APIResponse<SpaceFileByFolder>

export interface TrashSpaceFileRequest {
  spaceId: number
  dataSourceId: number[]
}

export type EditSpaceFileWithoutImgRequest = {
  spaceId: number
  dataSourceId: number
  title: string
  summary: string
  sourceUrl: string
  source: string
  imageUrl: string
  tags: string[]
  category: string
}

export type EditSpaceFileWithImgRequest = {
  spaceId: number
  dataSourceId: number
  payload: {
    title: string
    summary: string
    sourceUrl: string
    source: string
    tags: string[]
    category: string
  }
  image: File
}

export type EditResponse = APIResponse<SpaceFileData>
