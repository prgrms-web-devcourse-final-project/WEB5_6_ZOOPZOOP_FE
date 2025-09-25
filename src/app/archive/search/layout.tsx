import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '검색 결과',
  description: '검색 결과를 확인하는 페이지'
}
export default function ArchiveLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
