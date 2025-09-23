import { NewsCard } from '@/shared/ui/card'

export const NewsGrid = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <NewsCard
        title="title"
        content="content"
        imageUrl="/image.png"
      />
      <NewsCard
        title="title"
        content="content"
        imageUrl="/image.png"
      />
      <NewsCard
        title="title"
        content="content"
        imageUrl="/image.png"
      />
      <NewsCard
        title="title"
        content="content"
        imageUrl="/image.png"
      />
      <NewsCard
        title="title"
        content="content"
        imageUrl="/image.png"
      />
      <NewsCard
        title="title"
        content="content"
        imageUrl="/image.png"
      />
    </div>
  )
}
