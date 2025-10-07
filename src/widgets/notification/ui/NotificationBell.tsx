'use client'

import { Button } from '@/shared/ui/shadcn/button'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import NotificationList from './NotificationList'

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <Button
        type="button"
        className=""
        onClick={handleToggle}>
        <Bell />
      </Button>
      {isOpen && <NotificationList />}
    </>
  )
}
export default NotificationBell
