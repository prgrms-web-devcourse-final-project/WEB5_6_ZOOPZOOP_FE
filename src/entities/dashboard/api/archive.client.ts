import { httpClient } from '@/shared/lib'
import { FetchDashboardFolderResponse } from '../model/type'

export const fetchDashboardFolderClient = async (payload: string) => {
  const response = await httpClient.get<FetchDashboardFolderResponse>(
    `/api/dashboard/folder?spaceId=${payload}`
  )

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response.data
}
