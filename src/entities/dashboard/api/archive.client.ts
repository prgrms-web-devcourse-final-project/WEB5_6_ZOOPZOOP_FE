import { httpClient } from '@/shared/lib'
import { SpaceFolderResponse } from '../model/type'

export const fetchSpaceFolderClient = async (payload: {
  spaceId: number
}): Promise<SpaceFolderResponse> => {
  const response = await httpClient.get<SpaceFolderResponse>(
    `/api/dashboard/archive`,
    {
      headers: {
        'x-space-id': payload.spaceId.toString()
      }
    }
  )

  if (response.status !== '200' || !response.data) {
    throw new Error('아카이브 폴더를 가져올 수 없습니다.')
  }
  return response
}
