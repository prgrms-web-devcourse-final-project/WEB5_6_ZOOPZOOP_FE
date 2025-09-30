import { useParams } from 'next/navigation'
import { useState } from 'react'
import FolderItem from './FolderItem'
import { FolderData } from '@/entities/archive/folder'
import { useUserStore } from '@/entities/user'

interface Props {
  data: FolderData[]
}

function FolderGrid({ data }: Props) {
  const { folder } = useParams()
  const [clickedFolderId, setClickedFolderId] = useState<number | null>(null)

  const selectedIndex = data.findIndex(item => item.folderName === folder)
  // 사용자 이름
  const user = useUserStore(state => state.user)
  const useName = user?.name.split('#')[0] ?? '사용자 닉네임'

  // 선택된 폴더는 사용자 이름 바로 옆에 위치
  if (selectedIndex > 0) {
    const [item] = data.splice(selectedIndex, 1)
    data.unshift(item)
  }

  // 파일 모달 열렸을 때는 닫아야됨 -> 상태 끌어올려서
  const handleClicked = (id: number) => {
    setClickedFolderId(prev => (prev === id ? null : id))
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center">
        <p>등록된 폴더가 없습니다</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-h-[120px] overflow-y-auto">
      <FolderItem
        id={0}
        folderName={useName}
        isUndo={true}
        isClicked={false}
        isActive={false}
        onClick={handleClicked}
      />
      {data.map(({ folderName, folderId }) => {
        const isActive = folder === folderName
        return (
          <FolderItem
            id={folderId}
            isClicked={clickedFolderId === folderId}
            key={folderId}
            folderName={folderName}
            isUndo={false}
            isActive={isActive}
            onClick={handleClicked}
          />
        )
      })}
    </div>
  )
}
export default FolderGrid
