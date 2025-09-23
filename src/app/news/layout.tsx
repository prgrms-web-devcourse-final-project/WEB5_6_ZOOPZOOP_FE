import { NewsHeader } from '@/widgets/news-header'

export default function NewsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full">
      <NewsHeader />
      {children}
    </div>
  )
}
