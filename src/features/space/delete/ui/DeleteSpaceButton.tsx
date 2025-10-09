'use client'

import { useSpaceStore } from '@/entities/space'
import { AUTHORITIES } from '@/shared/constants'
import { useModalStore } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'

const DeleteSpaceButton = () => {
  const currentSpace = useSpaceStore(state => state.currentSpace)
  const openModal = useModalStore(state => state.openModal)

  const isOwner = currentSpace?.userAuthority === AUTHORITIES.ADMIN

  return (
    <Button
      disabled={!isOwner}
      onClick={() => {
        if (!currentSpace) return
        openModal({
          type: 'delete-space',
          props: {
            spaceId: currentSpace?.spaceId,
            title: currentSpace?.spaceName
          }
        })
      }}
      type="button"
      className="px-4 py-2 bg-red-600 text-white 
                   text-sm font-medium rounded-md
                   hover:bg-red-500 active:bg-red-800
                   transition-colors duration-200 cursor-pointer whitespace-nowrap">
      스페이스 삭제
    </Button>
  )
}
export default DeleteSpaceButton
