import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { FetchDashboardFolderResponse } from '../model/type'

// 나중에 스페이스로 바꿔야함 지금은 임시 아카이브로 조회
export const fetchDashboardFolderServer = async (
  payload: string,
  options: NextFetchOptions
) => {
  return await httpClient.get<FetchDashboardFolderResponse>(
    `/api/v1/space/${payload}/archive/folder`,
    options
  )
}

export const fetchDashboardFileServer = async (
  payload: string,
  options: NextFetchOptions
) => {
  return await httpClient.get<FetchDashboardFolderResponse>(
    `/api/v1/space/32/archive/folder/${payload}/files`,
    options
  )
}
