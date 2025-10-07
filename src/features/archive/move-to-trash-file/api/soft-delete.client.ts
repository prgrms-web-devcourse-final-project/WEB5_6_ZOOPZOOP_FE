import { FilePostResponse } from '@/entities/archive/file/model/type'
import { httpClient } from '@/shared/lib'

export const softDeleteArchiveFileClient = async (
  dataSourceId: number[]
): Promise<FilePostResponse> => {
  const response = await httpClient.patch<FilePostResponse>(
    `/api/archive/file/soft-delete`,
    dataSourceId
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
