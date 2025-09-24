// app/archive/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '폴더',
  description: '폴더안의 파일들을 볼 수 있는 페이지'
}

export default function ArchiveLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
