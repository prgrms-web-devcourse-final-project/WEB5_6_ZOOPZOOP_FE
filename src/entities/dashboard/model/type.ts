import { APIResponse } from '@/shared/types'

export type CreateDashboardJWTResponse = APIResponse<{ token: string }>

export interface DashboardFolder {
  folderId: number
  folderName: string
  files?: DashboardFile[]
}

export interface DashboardFile {
  dataSourceId: number
  title: string
  summary: string
  sourceUrl: string
  imageUrl?: string
  category?: string
  tags?: string[]
  createdAt: string
}

export type FetchDashboardFolderResponse = APIResponse<DashboardFolder[]>

export type FetchDashboardFileResponse = APIResponse<DashboardFile[]>
