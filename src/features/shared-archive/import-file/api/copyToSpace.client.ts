import { httpClient } from '@/shared/lib'
import { PostCopyToSpaceResponse } from '../model/type'

export const postCopyFileToSpaceClient = async (payload: {
  spaceId: number | null
  dataSourceId: number[]
  targetFolderId: number
}): Promise<PostCopyToSpaceResponse> => {
  const response = await httpClient.post<PostCopyToSpaceResponse>(
    `/api/shared-archive/file`,
    payload
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
