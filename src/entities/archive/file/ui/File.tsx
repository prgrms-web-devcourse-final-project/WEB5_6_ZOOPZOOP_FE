import { formatDate } from '@/shared/lib/formatter'
import FileCardTitle from './FileTitle'
import FileThumbnail from './FileThumbnail'
import { Avatar, Badge, Checkbox } from '@/shared/ui'
import { FileMode } from '@/features/archive'

interface Props {
  id: number // 자료 아이디
  category: string // 태그
  title: string // 자료 제목
  createdAt: string // 작성 시간
  imageUrl: string // 썸네일 url
  sourceUrl: string // 원본 url
  ownerProfileUrl?: string // 자료 등록한 사람 프로필 url
  mode: FileMode
  isSelected: boolean
  onSelect: (cardId: number) => void
}

/**
 * 자료 카드 레아이웃
 * 개인 아키이브에서 사용할 경우 ownerProfileUrl 필요 없음
 * 공용 스페이스에서 사용할 경우 ownerProfileUrl 필요
 */
const File = ({
  title,
  category,
  createdAt,
  id,
  mode,
  imageUrl,
  sourceUrl,
  ownerProfileUrl,
  isSelected,
  onSelect
}: Props) => {
  const formattedDate = formatDate(new Date(createdAt))

  return (
    <>
      {mode === 'trash' && (
        <Checkbox
          checked={isSelected}
          onClick={() => onSelect(id)}
        />
      )}

      {/* 썸네일 이미지 */}
      <div className="flex justify-center">
        <FileThumbnail
          imageUrl={imageUrl}
          title={title}
        />
      </div>

      {/* 카테고리 */}
      <Badge name={category} />
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
          title={`업로드 날짜: ${formattedDate}`}>
          {formattedDate}
        </time>
      </footer>
    </>
  )
}
export default File
