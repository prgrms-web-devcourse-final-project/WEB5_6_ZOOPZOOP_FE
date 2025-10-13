'use client'

import { AUTHORITIES } from '@/shared/constants'
import { Clock } from 'lucide-react'
import { SpaceCard as SpaceCardType } from '../model'
import ContributorList from './ContributorList'
import SpaceCardThumbnail from './SpaceCardThumbnail'
import { tw } from '@/shared/lib'

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
  contextMenu,
  authority,
  handleDashboardAccess,
  onContextMenu
}: Props) => {
  const isPending = authority === AUTHORITIES.PENDING

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isPending) return
    e.preventDefault()
    onContextMenu(e.clientX, e.clientY)
  }

  const handleClick = () => {
    if (isPending) return
    handleDashboardAccess(id.toString())
  }

  return (
    <>
      <li
        className={tw(
          // 기본 스타일
          'relative flex flex-col border border-[#D9D9D9] rounded-lg',
          'transition-all duration-200 min-w-52',
          // 조건부 스타일
          isPending
            ? 'opacity-60 cursor-not-allowed'
            : 'cursor-pointer hover:ring-3 hover:ring-orange-accent'
        )}
        onContextMenu={handleContextMenu}
        onClick={handleClick}>
        {/* PENDING 배지 */}
        {isPending && (
          <div
            className={tw(
              'absolute top-3 right-3 z-10',
              'flex items-center gap-1.5',
              'bg-gray-100 border border-gray-300 rounded-full',
              'px-3 py-1.5 shadow-sm'
            )}>
            <Clock className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs font-medium text-gray-700">
              승인 대기중
            </span>
          </div>
        )}

        {/* 카드 썸네일 */}
        <SpaceCardThumbnail
          imageUrl={thumbnailUrl}
          title="대체 텍스트"
        />

        {/* 카드 본문 */}
        <div className="flex justify-between items-center gap-1 px-4 py-2 border-t">
          <h3 className="truncate font-medium text-gray-darker text-sm max-w-full">
            {name}
          </h3>
          <ContributorList members={members} />
        </div>
      </li>

      {/* PENDING 상태가 아닐 때만 컨텍스트 메뉴 렌더링 */}
      {!isPending && contextMenu && <>{contextMenu}</>}
    </>
  )
}

export default SpaceCard
