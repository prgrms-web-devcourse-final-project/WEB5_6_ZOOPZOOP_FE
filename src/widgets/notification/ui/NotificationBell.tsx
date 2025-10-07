'use client'

import { Button } from '@/shared/ui/shadcn/button'
import { Bell } from 'lucide-react'
import { useRef, useState } from 'react'
import NotificationList from './NotificationList'

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        type="button"
        aria-label="알림"
        className="bg-white p-2 rounded-lg hover:bg-gray-100"
        onClick={handleToggle}>
        <Bell className="w-5 h-5 text-gray-600" />
      </Button>
      {isOpen && (
        <NotificationList
          onClose={handleClose}
          triggerRef={buttonRef}
        />
      )}
    </div>
  )
}
export default NotificationBell
