import { TrashSpaceFileRequest } from '@/entities/shared-archive/model/type'
import { httpClient } from '@/shared/lib'
import { APIResponse } from '@/shared/types'

//파일 다건 삭제
export const restoreSpaceFileClient = async ({
  spaceId,
  dataSourceId
}: TrashSpaceFileRequest): Promise<APIResponse<null>> => {
  const response = await httpClient.patch<APIResponse<null>>(
    `/api/shared-archive/restore`,
    { spaceId, dataSourceId }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
