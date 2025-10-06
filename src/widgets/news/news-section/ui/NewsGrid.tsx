import { News } from '@/entities/news'
import { BaseNewsCard } from '@/shared/ui/card'

interface Props {
  news: News[]
  page: number
}
export const NewsGrid = ({ news, page }: Props) => {
  const limitedNews = news.slice((page - 1) * 18, page * 18)

  return (
    <div className="flex flex-wrap gap-4">
      {limitedNews.map((item, index) => (
        <BaseNewsCard
          key={item.link || `${item.title}-${index}`}
          title={item.title}
          content={item.description}
          createdAt={item.pubDate}
          link={item.link}
          imageUrl={`/api/og-image?url=${encodeURIComponent(item.link)}`}
          type="base"
        />
      ))}
    </div>
  )
}
