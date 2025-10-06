import { FilePostResponse } from '@/entities/archive/file/model/type'
import { httpClient } from '@/shared/lib'
import { NextFetchOptions } from '@/shared/types'
import { ManyFileMove, OneFileMove } from '../model/type'

// 파일 단 건 이동
export const moveOneArchiveFileServer = async (
  { dataSourceId, folderId }: OneFileMove,
  options: NextFetchOptions
) => {
  const res = await httpClient.patch<FilePostResponse>(
    `/api/v1/archive/${dataSourceId}/move`,
    { folderId: Number(folderId) },
    options
  )

  return res
}

// 파일 다건 이동
export const moveManyArchiveFilesServer = async (
  { dataSourceId, folderId }: ManyFileMove,
  options: NextFetchOptions
) => {
  return await httpClient.patch<FilePostResponse>(
    `/api/v1/archive/move`,
    { dataSourceId, folderId },
    options
  )
}
