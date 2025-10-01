'use client'

import { useEffect, useState } from 'react'
import FolderItem from './FolderItem'
import { FolderData } from '@/entities/archive/folder'
import { useUserStore } from '@/entities/user'
import { useModalStore } from '@/shared/lib'

interface Props {
  data: FolderData[]
}

function FolderGrid({ data }: Props) {
  const [clickedFolderId, setClickedFolderId] = useState<number | null>(null)

  // const selectedIndex = data.findIndex(item => item.folderName === folder)
  // 사용자 이름
  const user = useUserStore(state => state.user)
  const useName = user?.name.split('#')[0] ?? '사용자 닉네임'

  // 선택된 폴더는 사용자 이름 바로 옆에 위치
  // const reorderedData = useMemo(() => {
  //   if (!selectedFolder) return data
  //   const index = data.findIndex(item => item.folderName === selectedFolder)
  //   if (index > 0) {
  //     const newData = [...data]
  //     const [selected] = newData.splice(index, 1)
  //     newData.unshift(selected)
  //     return newData
  //   }
  //   return data
  // }, [data, selectedFolder])

  const isModalOpen = useModalStore(s => s.isOpen)
  useEffect(() => {
    if (isModalOpen) {
      setClickedFolderId(null)
    }
  }, [isModalOpen])

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
        folderId={0}
        folderName={useName}
        isUndo={true}
        isClicked={false}
        isActive={false}
        onClick={handleClicked}
      />
      {data.map(({ folderName, folderId }) => {
        const isActive = clickedFolderId === folderId

        return (
          <FolderItem
            folderId={folderId}
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
