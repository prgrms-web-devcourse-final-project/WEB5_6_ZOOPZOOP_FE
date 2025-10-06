import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일과 폴더를 관리하는 휴지통 페이지'
}
export default function ArchiveLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="w-full">{children}</div>
}
