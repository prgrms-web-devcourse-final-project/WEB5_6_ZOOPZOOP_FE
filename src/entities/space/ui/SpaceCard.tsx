'use client'

import { formatISODate } from '@/shared/lib/formatter'
import SpaceCardThumbnail from './SpaceCardThumbnail'
// import ContributorList from './ContributorList'
import { SpaceCard as SpaceCardType } from '../model'
import ContributorList from './ContributorList'

interface Props extends SpaceCardType {
  onContextMenu: (x: number, y: number) => void
  contextMenu?: React.ReactNode
  handleDashboardAccess: (spaceId: string) => void
}

const SpaceCard = ({
  id,
  members,
  name,
  thumbnailUrl,
  createDate,
  contextMenu,
  handleDashboardAccess,
  onContextMenu
}: Props) => {
  // 날짜 포멧
  const formattedData = formatISODate(createDate)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    onContextMenu(e.clientX, e.clientY)
  }

  return (
    <>
      <li
        className="flex flex-col border border-[#D9D9D9] rounded-lg cursor-pointer transition-all duration-200 hover:ring-3 hover:ring-orange-accent min-w-52"
        onContextMenu={handleContextMenu}
        onClick={() => {
          handleDashboardAccess(id.toString())
        }}>
        {/* 카드 썸네일 */}
        <SpaceCardThumbnail
          imageUrl={thumbnailUrl}
          title="대체 텍스트"
        />
        {/* 카드 본문 */}
        <div className="flex justify-between items-start gap-1 px-4 py-2 border-t">
          <div className="flex-1 min-w-0 truncate">
            <h3 className="font-medium text-gray-darker text-sm truncate max-w-full">
              {name}
            </h3>
            <time className="font-light text-gray-normal text-xs">
              {formattedData}
            </time>
          </div>
          <ContributorList members={members} />
        </div>
      </li>
      {contextMenu && <>{contextMenu}</>}
    </>
  )
}
export default SpaceCard
