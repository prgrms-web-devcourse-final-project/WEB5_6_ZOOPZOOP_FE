import { NewsHeader } from '@/widgets/news-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스',
  description: '뉴스'
}

export default function News() {
  return (
    <div className="w-full h-full">
      <NewsHeader />
    </div>
  )
}
