'use client'

import { useModalStore } from '@/shared/lib'

const LeaveSpace = () => {
  const openModal = useModalStore(state => state.openModal)

  // 스페이스 나가기 모달 열기
  const handleLeave = () => {
    // openModal({
    //   type: 'leave-space',
    //   props: {
    //     spaceId: 1, // TODO: 실제 spaceId로 변경
    //     title: '스페이스 이름' // TODO: 실제 스페이스 이름으로 변경
    //   }
    // })
  }

  return (
    <button
      onClick={handleLeave}
      type="button"
      className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap">
      나가기
    </button>
  )
}

export default LeaveSpace
