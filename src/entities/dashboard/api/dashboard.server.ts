import { httpClient } from '@/shared/lib'
import { CreateDashboardJWTResponse } from '../model/type'
import { NextFetchOptions } from '@/shared/types'

// 대시보드 토큰 생성
export const postDashboardJWTServer = async (
  payload: string,
  options: NextFetchOptions
) => {
  return await httpClient.post<CreateDashboardJWTResponse>(
    `/api/v1/space/dashboard-auth/${payload}`,
    {},
    options
  )
}
