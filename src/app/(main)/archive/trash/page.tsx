import { fetchArchiveTrashFilesServer } from '@/entities/archive/file/api/file.server'
import { Header } from '@/shared/ui/header'
import { FileSection } from '@/widgets/archive/file-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일과 폴더를 관리하는 휴지통 페이지'
}

const DEFAULT_PAGE_SIZE = 8
const ROOT_FOLDER_ID = 0
const INITIAL_PAGE = 0

async function ArchiveTrashPage() {
  const fileResponse = await fetchArchiveTrashFilesServer({
    page: INITIAL_PAGE,
    size: DEFAULT_PAGE_SIZE,
    folderId: ROOT_FOLDER_ID,
    isActive: false
  })
  return (
    <>
      <Header
        title="휴지통"
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FileSection
          initialFileList={fileResponse.data}
          initialPageInfo={fileResponse.pageInfo}
        />
      </div>
    </>
  )
}
export default ArchiveTrashPage
