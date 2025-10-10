//자료 다건 불러오기

import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { PostCopyToSpaceResponse } from '../model/type'

export const postCopyFileToSpaceServer = async (
  payload: {
    spaceId: number | null
    dataSourceId: number[]
    targetFolderId: number
  },
  options: NextFetchOptions
): Promise<PostCopyToSpaceResponse> => {
  return await httpClient.post<PostCopyToSpaceResponse>(
    `/api/v1/space/${payload.spaceId}/archive/datasources/import/batch`,
    {
      dataSourceId: payload.dataSourceId,
      targetFolderId: payload.targetFolderId
    },

    options
  )
}
