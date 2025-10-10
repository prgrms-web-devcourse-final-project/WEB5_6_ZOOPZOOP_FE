import { TrashSpaceFileRequest } from '@/entities/shared-archive/model/type'
import { httpClient } from '@/shared/lib'
import { APIResponse, NextFetchOptions } from '@/shared/types'

// 파일 수정
export const restoreSpaceFileServer = async (
  { spaceId, dataSourceId }: TrashSpaceFileRequest,
  options: NextFetchOptions
) => {
  return await httpClient.patch<APIResponse<null>>(
    `/api/v1/space/${spaceId}/archive/datasources/restore`,
    { dataSourceId: dataSourceId },
    options
  )
}
