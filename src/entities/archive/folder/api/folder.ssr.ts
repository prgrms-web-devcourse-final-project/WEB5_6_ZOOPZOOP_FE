import { requireAuth } from '@/shared/lib/api-route'
import { FolderResponse } from '../model/type'
import { fetchArchiveFolderServer } from './folder.server'

// 페이지 내 파일 조회
export const getInitialFolderList = async (): Promise<FolderResponse> => {
  const response = await requireAuth(async token => {
    return fetchArchiveFolderServer({
      token,
      next: { revalidate: 60, tags: ['archiveFolders'] }
    })
  })

  if (response.status !== 200) {
    throw new Error(response.msg)
  }

  return response
}
