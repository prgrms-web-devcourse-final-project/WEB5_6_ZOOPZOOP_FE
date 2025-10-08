import { httpClient } from '@/shared/lib'
import { APIResponse, NextFetchOptions } from '@/shared/types'

// 파일 수정
export const restoreArchiveFileServer = async (
  payload: {
    dataSourceId: number[]
  },
  options: NextFetchOptions
) => {
  return await httpClient.patch<APIResponse<null>>(
    `/api/v1/archive/restore`,
    { dataSourceId: payload.dataSourceId },
    options
  )
}
