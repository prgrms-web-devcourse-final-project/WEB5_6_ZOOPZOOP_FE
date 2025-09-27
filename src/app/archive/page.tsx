import { ArchiveContents } from '@/widgets/archive/contents'
import { Suspense } from 'react'

export default function Archive() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArchiveContents />
    </Suspense>
  )
}
