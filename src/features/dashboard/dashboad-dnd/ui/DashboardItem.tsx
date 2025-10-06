'use client'

import { SubNewsCard } from '@/shared/ui/card'
import { useDnD } from '../model/useDnD'
import { DashboardFile } from '@/entities/dashboard'

interface Props {
  file: DashboardFile
}

export const DashboardItem = ({ file }: Props) => {
  const { onDragStart } = useDnD()

  return (
    <div
      draggable
      onDragStart={event =>
        onDragStart(event, {
          title: file.title,
          link: file.sourceUrl,
          imageUrl: file.imageUrl,
          category: file.category,
          description: file.summary,
          pubDate: file.createdAt
        })
      }
      className="cursor-grab active:cursor-grabbing">
      <SubNewsCard
        title={file.title}
        content={file.summary}
        createdAt={file.createdAt}
        imageUrl={file.imageUrl}
        category={file.category}
      />
    </div>
  )
}
