'use client'

import { tw } from '@/shared/lib'
import { useState } from 'react'
import { LuFolder } from 'react-icons/lu'
import { LuFileText } from 'react-icons/lu'

export const ArchiveFolder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <div className="cursor-pointer flex flex-col gap-2 text-sm ml-10">
      <div
        className="flex items-center gap-2.5"
        onClick={handleToggle}>
        <LuFolder size={20} />
        <p>폴더 이름</p>
      </div>
      <div className={tw('flex flex-col gap-1.5 ml-10', isOpen && 'hidden')}>
        <div className="flex items-center gap-2.5">
          <LuFileText size={20} />
          <p>파일 이름</p>
        </div>
        <div className="flex items-center gap-2.5">
          <LuFileText size={20} />
          <p>파일 이름</p>
        </div>
        <div className="flex items-center gap-2.5">
          <LuFileText size={20} />
          <p>파일 이름</p>
        </div>
      </div>
    </div>
  )
}
