import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { SpaceFolderResponse } from '../model/type'

export const fetchSpaceFolderServer = async (
  payload: { spaceId: number },
  options: NextFetchOptions
): Promise<SpaceFolderResponse> => {
  return httpClient.get<SpaceFolderResponse>(
    `/api/v1/spaces/${payload.spaceId}/archive/folder`,
    options
  )
}
