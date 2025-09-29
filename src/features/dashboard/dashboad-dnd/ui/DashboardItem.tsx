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
  nodeType,
  imageUrl,
  category
}: Props) => {
  const { onDragStart } = useDnD()

  return (
    <div
      draggable
      onDragStart={event => onDragStart(event, nodeType)}
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
