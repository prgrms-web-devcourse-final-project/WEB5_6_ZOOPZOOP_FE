import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { Header } from '@/shared/ui/header'
import { FileSection } from '@/widgets/archive/file-section'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과를 확인하는 페이지'
}

interface Props {
  searchParams: { q?: string; page?: string }
}
const ROOT_FOLDER_ID = 0
const INITIAL_PAGE = 1

export default async function ArchiveSearchPage({ searchParams }: Props) {
  const query = searchParams.q ?? ''
  const currentPage = Number(searchParams?.page) || INITIAL_PAGE

  const initialFileData = await getInitialFileList({
    page: currentPage,
    size: 12,
    keyword: query
  })
  return (
    <div>
      <Header
        title={`${query}`}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="w-full flex flex-col p-8 gap-4 ">
        <FileSection
          folderId={ROOT_FOLDER_ID}
          mode="archive"
          initialFileData={initialFileData && initialFileData}
          initialPage={currentPage}
        />
      </div>
    </div>
  )
}
