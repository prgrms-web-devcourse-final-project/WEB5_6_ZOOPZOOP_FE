'use client'

import { Header } from '@/shared/ui/header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive/file-section'
import { useSearchParams } from 'next/navigation'

function ArchiveSearchContents() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')

  return (
    <>
      <Header
        title={`${q}`}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FileSection fileList={[]} />
        <Pagination totalPages={5} />
      </div>
    </>
  )
}
export default ArchiveSearchContents
