import { File } from '@/entities/archive/file'
import { HoveredCard } from '@/features/archive/hover-file'

import { tw } from '@/shared/lib'
import { useState } from 'react'

interface Props {
  id: number // 자료 아이디
  category: string // 태그
  title: string // 자료 제목
  summary: string // 요약
  createdAt: string // 작성 시간
  imageUrl: string // 썸네일 url
  sourceUrl: string // 원본 url
  ownerProfileUrl?: string // 자료 등록한 사람 프로필 url
  isSelected: boolean
  tags: string[]
  onSelect: (cardId: number) => void
}

/**
 * 자료 카드 레아이웃
 * 개인 아키이브에서 사용할 경우 ownerProfileUrl 필요 없음
 * 공용 스페이스에서 사용할 경우 ownerProfileUrl 필요
 */
const FileCard = ({
  title,
  category,
  createdAt,
  id,
  imageUrl,
  sourceUrl,
  ownerProfileUrl,
  isSelected,
  summary,
  tags,
  onSelect
}: Props) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <article
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={tw(
        'w-10/12 h-75 p-3 rounded-sm shadow-md flex flex-col gap-2.5 transition-all duration-500 bg-[#F9FAFB] relative',
        isSelected && 'ring-3 ring-orange-accent'
      )}>
      <File
        id={id}
        category={category}
        title={title}
        createdAt={createdAt}
        imageUrl={imageUrl}
        sourceUrl={sourceUrl}
        isSelected={isSelected}
        ownerProfileUrl={ownerProfileUrl}
        onSelect={onSelect}
      />
      <HoveredCard
        id={id}
        tags={tags}
        isSelected={isSelected}
        sourceUrl={sourceUrl}
        title={title}
        isHover={isHover}
        onSelect={onSelect}
        summary={summary}
      />
    </article>
  )
}
export default FileCard
