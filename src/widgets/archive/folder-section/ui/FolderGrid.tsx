'use client'

import FolderItem from './FolderItem'
import { FolderData } from '@/entities/archive/folder'
import { useUserStore } from '@/entities/user'
import { useSearchParams } from 'next/navigation'
import { useContextMenu } from '@/shared/hooks'
import ArchiveContextMenu from '@/features/archive/list/ui/ArchiveFolderContextMenu'

interface Props {
  data: FolderData[]
}

function FolderGrid({ data }: Props) {
  // 컨택스트 메뉴
  const { closeMenu, handleContextMenu, activeMenu } = useContextMenu()
  const searchParams = useSearchParams()
  const folder = searchParams.get('name')
  const clickedFolder = folder ? decodeURIComponent(String(folder)) : ''
  const user = useUserStore(state => state.user)
  const useName = user?.name.split('#')[0] ?? '사용자 닉네임'

  if (data.length === 0) {
    return (
      <div className="flex justify-center">
        <p>등록된 폴더가 없습니다</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-h-[120px] overflow-y-auto">
      {/* <FolderItem
        folderName={useName}
        isUndo={true}
        isActive={false}
      /> */}

      {data.map(({ folderName, folderId }) => {
        const isActive = clickedFolder === folderName
        return (
          <FolderItem
            key={folderId}
            folderId={folderId}
            folderName={folderName}
            useName={useName}
            isDefault={folderName === 'default'}
            isActive={isActive}
            isContextMenuActive={activeMenu.targetId === folderId}
            onContextMenu={(x, y) => handleContextMenu(folderId, x, y)}
            contextMenu={
              activeMenu.targetId === folderId ? (
                <ArchiveContextMenu
                  folderName={folderName}
                  folderId={folderId}
                  position={activeMenu.position}
                  onClose={closeMenu}
                />
              ) : undefined
            }
          />
        )
      })}
    </div>
  )
}
export default FolderGrid
