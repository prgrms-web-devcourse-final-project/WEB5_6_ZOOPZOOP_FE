import { ArchiveFolderDetailContents } from '@/widgets/archive/contents'
import { Suspense } from 'react'
export async function generateMetadata({
  params
}: {
  params: Promise<{ folder: string }>
}) {
  const { folder } = await params
  return { title: folder }
}
export default function ArchiveFolderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArchiveFolderDetailContents />
    </Suspense>
  )
}
