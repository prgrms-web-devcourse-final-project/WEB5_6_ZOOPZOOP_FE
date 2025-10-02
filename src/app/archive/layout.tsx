import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '아카이브',
    template: '아카이브 | %s '
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
