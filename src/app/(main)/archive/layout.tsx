// app/archive/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '아카이브  | ZOOP',
    template: '%s | 아카이브 | ZOOP '
  },
  description: 'ZOOPZOOP의 아카이브 페이지'
}

export default function ArchiveLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
