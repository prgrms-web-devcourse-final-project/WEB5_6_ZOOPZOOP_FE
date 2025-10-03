import { requireAuth } from '@/shared/lib/api-route'
import { fetchArchiveFilesByPageServer } from './file.server'
import { PageInfo, SearchGetResponse, FileSearchParams } from '../model/type'

// 페이지 내 파일 조회
export const getInitialFileList = async ({
  folderId,
  page,
  size
}: FileSearchParams): Promise<SearchGetResponse> => {
  const response = await requireAuth(async token => {
    return fetchArchiveFilesByPageServer(
      { folderId, page, size },
      {
        token,
        next: { revalidate: 60, tags: ['archiveFiles'] }
      }
    )
  })

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response as SearchGetResponse
}
