import { httpClient } from '@/shared/lib'
import { CreateDashboardJWTResponse } from '../model/type'

export const postDashboardJWTClient = async (payload: string) => {
  const response = await httpClient.post<CreateDashboardJWTResponse>(
    '/api/dashboard',
    payload
  )

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response.data
}
