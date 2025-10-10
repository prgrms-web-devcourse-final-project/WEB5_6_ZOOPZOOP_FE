import { File } from '@/entities/shared-archive'
import { HoveredCard, SpaceFileMode } from '@/features/shared-archive'
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
  tags: string[]
  mode: SpaceFileMode
  isSelected: boolean
  contextMenu?: React.ReactNode
  onContextMenu?: (x: number, y: number) => void
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
  mode,
  summary,
  tags,
  isSelected,
  contextMenu,
  onContextMenu,
  onSelect
}: Props) => {
  const [isHover, setIsHover] = useState(false)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onContextMenu) onContextMenu(e.clientX, e.clientY)
  }

  return (
    <article
      onContextMenu={handleContextMenu}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={tw(
        ' p-3 rounded-sm shadow-md flex flex-col gap-2.5 transition-all duration-500 bg-[#F9FAFB] relative border border-gray-light',
        isSelected && 'ring-3 ring-orange-accent'
      )}>
      <File
        mode={mode}
        id={id}
        category={category}
        title={title}
        createdAt={createdAt}
        imageUrl={imageUrl}
        sourceUrl={sourceUrl}
        ownerProfileUrl={ownerProfileUrl}
        isSelected={isSelected}
        onSelect={onSelect}
      />

      <HoveredCard
        mode={mode}
        id={id}
        tags={tags}
        sourceUrl={sourceUrl}
        isHover={isHover}
        summary={summary}
        isSelected={isSelected}
        onSelect={onSelect}
      />
      {contextMenu && mode !== 'trash' && contextMenu}
    </article>
  )
}
export default FileCard
