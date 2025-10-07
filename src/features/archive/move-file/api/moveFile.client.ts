import { FilePostResponse } from '@/entities/archive/file/model/type'
import { httpClient } from '@/shared/lib'
import { ManyFileMove, OneFileMove } from '../model/type'

// 파일 다건 이동
export const moveManyArchiveFilesClient = async ({
  dataSourceId,
  folderId
}: ManyFileMove): Promise<FilePostResponse> => {
  const response = await httpClient.patch<FilePostResponse>(
    `/api/archive/file/list`,
    {
      dataSourceId,
      folderId
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }
  return response
}

// 파일 단건 이동
export const moveOneArchiveFilesClient = async ({
  dataSourceId,
  folderId
}: OneFileMove): Promise<FilePostResponse> => {
  const response = await httpClient.patch<FilePostResponse>(
    `/api/archive/file`,
    {
      dataSourceId,
      folderId
    }
  )
  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response
}
