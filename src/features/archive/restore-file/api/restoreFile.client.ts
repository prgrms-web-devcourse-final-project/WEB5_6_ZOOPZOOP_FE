import { httpClient } from '@/shared/lib'
import { APIResponse } from '@/shared/types'

//파일 다건 삭제
export const restoreManyArchiveFileClient = async (
  dataSourceId: number[]
): Promise<APIResponse<null>> => {
  const response = await httpClient.patch<APIResponse<null>>(
    `/api/archive/file/restore`,
    { dataSourceId: dataSourceId }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}
