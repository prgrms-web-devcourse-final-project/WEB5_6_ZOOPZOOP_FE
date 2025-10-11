import { FilePostResponse } from '@/entities/archive/file/model/type'
import { httpClient } from '@/shared/lib'
import { SpaceSoftDeleteRequest } from '../model/type'

// 스페이스 자료 임시 삭제
export const softDeleteSpaceFileClient = async ({
  dataSourceId,
  spaceId
}: SpaceSoftDeleteRequest): Promise<FilePostResponse> => {
  const response = await httpClient.patch<FilePostResponse>(
    `/api/shared-archive/soft-delete`,
    {
      dataSourceId,
      spaceId
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
