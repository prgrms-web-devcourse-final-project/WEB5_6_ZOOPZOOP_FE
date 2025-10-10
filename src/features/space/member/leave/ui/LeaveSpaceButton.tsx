'use client'

import { useSpaceStore } from '@/entities/space'
import { useModalStore } from '@/shared/lib'

const LeaveSpaceButton = () => {
  const openModal = useModalStore(state => state.openModal)
  const currentSpace = useSpaceStore(state => state.currentSpace)

  // 스페이스 나가기 모달 열기
  const handleClick = () => {
    if (!currentSpace) return
    openModal({
      type: 'leave-space',
      props: {
        spaceId: currentSpace.spaceId
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-500 transition-colors duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap">
      나가기
    </button>
  )
}

export default LeaveSpaceButton
