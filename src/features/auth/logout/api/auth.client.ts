import { httpClient } from '@/shared/lib'
import { LogoutResponse } from '@/shared/types'

// 로그아웃
export const logoutUserClient = async (): Promise<void> => {
  const response = await httpClient.get<LogoutResponse>('/api/auth')

  const { status } = response

  if (status !== 200) {
    throw new Error('로그아웃 실패')
  }
}
