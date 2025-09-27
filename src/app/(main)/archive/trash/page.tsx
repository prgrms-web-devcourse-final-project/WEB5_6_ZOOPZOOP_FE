import { ArchiveTrashContents } from '@/widgets/archive/contents'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일과 폴더를 관리하는 휴지통 페이지'
}
function ArchiveTrashPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArchiveTrashContents />
    </Suspense>
  )
}
export default ArchiveTrashPage
