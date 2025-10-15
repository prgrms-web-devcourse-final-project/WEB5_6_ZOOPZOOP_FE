import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { Header } from '@/shared/ui/header'
import { FileSection } from '@/widgets/archive/file-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일과 폴더를 관리하는 휴지통 페이지'
}

const INITIAL_PAGE = 1
const DEFAULT_SIZE = 12

interface Props {
  searchParams: Promise<{ page?: string; sort?: string }>
}
async function ArchiveTrashPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Number(params?.page) || INITIAL_PAGE
  const currentSort = params?.sort

  const initialFileData = await getInitialFileList({
    size: 12,
    page: 0,
    isActive: false,
    sort: currentSort
  })

  return (
    <div>
      <Header
        title="휴지통"
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="w-full flex flex-col p-8 gap-4 ">
        <FileSection
          currentSort={currentSort}
          size={DEFAULT_SIZE}
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
