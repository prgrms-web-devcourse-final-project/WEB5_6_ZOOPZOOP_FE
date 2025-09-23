import { NewsHeader } from '@/widgets/news-header'
import { Suspense } from 'react'

export default function NewsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <NewsHeader />
      </Suspense>
      {children}
    </div>
  )
}
