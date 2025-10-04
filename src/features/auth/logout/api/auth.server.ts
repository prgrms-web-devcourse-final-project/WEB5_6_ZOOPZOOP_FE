import { httpClient } from '@/shared/lib'
import { LogoutResponse, NextFetchOptions } from '@/shared/types'

// 로그아웃
export const logoutUserServer = async (
  options: NextFetchOptions
): Promise<LogoutResponse> => {
  return httpClient.get('/api/v1/auth/logout', options)
}
