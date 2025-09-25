'use client'

import { Header } from '@/shared/ui/header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive/file-section'
import { Suspense } from 'react'

function ArchiveTrashPage() {
  return (
    <>
      <Header
        title="아카이브"
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FileSection />
        <Suspense fallback={null}>
          <Pagination totalPages={5} />
        </Suspense>
      </div>
    </>
  )
}
export default ArchiveTrashPage
