import { httpClient } from '@/shared/lib'
import { APIResponse, NextFetchOptions } from '@/shared/types'

export const softDeleteArchiveFileServer = async (
  dataSourceId: number[],
  options: NextFetchOptions
) => {
  const res = await httpClient.patch<APIResponse<null>>(
    `/api/v1/archive/soft-delete`,
    { dataSourceId },
    options
  )

  return res
}
