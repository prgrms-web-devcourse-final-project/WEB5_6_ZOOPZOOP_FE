import { formatDate } from '@/shared/lib/formatter'
import SpaceCardThumbnail from './SpaceCardThumbnail'
// import ContributorList from './ContributorList'
import { Space } from '../model/type'

/**
 * 스페이드 카드 레아이웃
 * API response에 contributors 목록이 없음
 * 백앤드와 협의 필요
 */
const SpaceCard = ({ authority, id, name, thumbnailUrl }: Space) => {
  const formattedData = formatDate(new Date())

  return (
    <article className="flex flex-col w-[370px] p-4 border border-[#D9D9D9] rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:ring-3 hover:ring-orange-accent">
      {/* 카드 썸네일 */}
      <SpaceCardThumbnail
        imageUrl={thumbnailUrl} // 나중에 실제 데이터가 들어와야함
        title="대체 텍스트"
      />
      {/* 카드 본문 */}
      <div className="flex justify-between items-start gap-1">
        <div className="flex-1 min-w-0 truncate">
          <h3 className="font-medium text-gray-darker text-sm truncate max-w-full">
            {name}
          </h3>
          <time className="font-light text-gray-normal text-xs">
            {formattedData}
          </time>
        </div>
        {/* <ContributorList contributors={contributors} /> */}
      </div>
    </article>
  )
}
export default SpaceCard
