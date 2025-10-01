'use client'

import { SubNewsCard } from '@/shared/ui/card'
import { useDnD } from '../model/useDnD'

interface Props {
  title: string
  content: string
  createdAt: string
  nodeType: string
  imageUrl?: string
  category?: string
}

export const DashboardItem = ({
  title,
  content,
  createdAt,
  imageUrl,
  category
}: Props) => {
  const { onDragStart } = useDnD()

  return (
    <div
      draggable
      onDragStart={event =>
        onDragStart(event, {
          title,
          link: '',
          imageUrl,
          category,
          description: content,
          pubDate: createdAt
        })
      }
      className="cursor-grab active:cursor-grabbing">
      <SubNewsCard
        title={title}
        content={content}
        createdAt={createdAt}
        imageUrl={imageUrl}
        category={category}
      />
    </div>
  )
}
