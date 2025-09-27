import { ArchiveSearchContents } from '@/widgets/archive/contents'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과를 확인하는 페이지'
}

function ArchiveSearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArchiveSearchContents />
    </Suspense>
  )
}
export default ArchiveSearchPage
