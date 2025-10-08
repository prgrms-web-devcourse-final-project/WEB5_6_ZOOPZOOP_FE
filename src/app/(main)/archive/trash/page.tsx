import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { Header } from '@/shared/ui/header'
import { FileSection } from '@/widgets/archive/file-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일과 폴더를 관리하는 휴지통 페이지'
}

const DEFAULT_PAGE_SIZE = 12
const INITIAL_PAGE = 1

interface Props {
  searchParams: Promise<{ page?: string }>
}
async function ArchiveTrashPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Number(params?.page) || INITIAL_PAGE

  const initialFileData = await getInitialFileList({
    page: INITIAL_PAGE,
    size: DEFAULT_PAGE_SIZE,
    isActive: false
  })

  return (
    <div>
      <Header
        title="휴지통"
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FileSection
          folderId={currentPage}
          mode="trash"
          initialFileData={initialFileData && initialFileData}
          initialPage={INITIAL_PAGE}
        />
      </div>
    </div>
  )
}
export default ArchiveTrashPage
