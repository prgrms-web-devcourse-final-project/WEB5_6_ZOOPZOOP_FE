import { httpClient } from '@/shared/lib'
import { APIResponse, NextFetchOptions } from '@/shared/types'
import { SpaceSoftDeleteRequest } from '../model/type'

export const softDeleteSpaceFileServer = async (
  { spaceId, dataSourceId }: SpaceSoftDeleteRequest,
  options: NextFetchOptions
) => {
  const res = await httpClient.patch<APIResponse<null>>(
    `/api/v1/space/${spaceId}/archive/datasources/soft-delete`,
    { dataSourceId: dataSourceId },
    options
  )

  return res
}
