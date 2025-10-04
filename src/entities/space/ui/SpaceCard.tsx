import { formatISODate } from '@/shared/lib/formatter'
import SpaceCardThumbnail from './SpaceCardThumbnail'
// import ContributorList from './ContributorList'
import { MenuState, Space } from '../model/type'
import { useState } from 'react'

interface Props extends Space {
  renderContextMenu?: (props: {
    position: { x: number; y: number }
    onClose: () => void
  }) => React.ReactNode
}

const SpaceCard = ({
  name,
  thumbnailUrl,
  createDate,
  renderContextMenu
}: Props) => {
  const [menuState, setMenuState] = useState<MenuState>({
    isOpen: false,
    x: 0,
    y: 0
  })
  // 날짜 포멧
  const formattedData = formatISODate(createDate)

  // 핸들 컨택스트 메뉴
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuState({ isOpen: true, x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <li
        className="flex flex-col border border-[#D9D9D9] rounded-lg cursor-pointer transition-all duration-200 hover:ring-3 hover:ring-orange-accent"
        onContextMenu={handleContextMenu}>
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
          {/* <ContributorList contributors={contributors} /> */}
        </div>
      </li>
      {renderContextMenu &&
        menuState.isOpen &&
        renderContextMenu({
          position: { x: menuState.x, y: menuState.y },
          onClose: () => setMenuState(prev => ({ ...prev, isOpen: false }))
        })}
    </>
  )
}
export default SpaceCard
