import { APIResponse } from '@/shared/types'

export type CreateDashboardJWTResponse = APIResponse<{ token: string }>

export type DashboardFolder = {
  folderName: string
  folderId: number
}

export type DashboardFile = {
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

export type FetchDashboardFolderResponse = APIResponse<DashboardFolder[]>

export type FetchDashboardFileResponse = APIResponse<DashboardFile[]>
