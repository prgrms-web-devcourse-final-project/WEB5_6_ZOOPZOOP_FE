import { EllipsisVertical } from 'lucide-react'
import { tw } from '@/shared/lib'
import { formatDate } from '@/shared/lib/formatter'
import { Checkbox } from '../../shadcn/checkbox'

import { Avatar } from '../../avatar'

import FileCardTitle from './FileCardTitle'
import FileCardThumbnail from './FileCardThumbnail'
import { Badge } from '../../badge'

interface Props {
  category: string // 태그
  title: string // 자료 제목
  id: number // 자료 아이디
  createAt: Date // 작성 시간
  imageUrl: string // 썸네일 url
  sourceUrl: string // 원본 url
  ownerProfileUrl?: string // 자료 등록한 사람 프로필 url

  isSelected: boolean
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
  createAt,
  id,
  imageUrl,
  sourceUrl,
  ownerProfileUrl,
  isSelected,
  onSelect
}: Props) => {
  // 임시 state 부모에서 사용할 때 삭제해도 됨

  const formattedDate = formatDate(createAt)

  return (
    <article
      className={tw(
        'w-64 p-3 rounded-sm shadow-md flex flex-col gap-2.5 transition-all duration-200 bg-[#F9FAFB]',
        isSelected && 'ring-3 ring-orange-accent'
      )}>
      {/* 체크 박스 */}
      <Checkbox
        className="text-orange-accent size-5"
        checked={isSelected}
        onCheckedChange={() => onSelect(id)}
        aria-label={`${title} 자료 선택`}
        id={`checkbox-${id}`}
      />
      {/* 썸네일 이미지 */}
      <FileCardThumbnail
        imageUrl={imageUrl}
        title={title}
      />
      {/* 카테고리 + 메뉴 */}
      <div className="flex justify-between">
        <Badge name={category} />
        <button
          type="button"
          className="text-gray-normal  hover:text-gray-dark cursor-pointer"
          aria-label={`${title} 자료 메뉴`}>
          <EllipsisVertical aria-hidden="true" />
        </button>
      </div>
      {/* 카드 제목 */}
      <FileCardTitle
        sourceUrl={sourceUrl}
        title={title}
      />
      {/* card footer */}
      <footer className="flex justify-between">
        {ownerProfileUrl && (
          <Avatar
            url={ownerProfileUrl}
            alt="사용자"
          />
        )}
        <time
          className="text-xs text-gray-normal font-medium my-auto flex-1 text-end"
          title={`작성일: ${formattedDate}`}>
          {formattedDate}
        </time>
      </footer>
    </article>
  )
}
export default FileCard
