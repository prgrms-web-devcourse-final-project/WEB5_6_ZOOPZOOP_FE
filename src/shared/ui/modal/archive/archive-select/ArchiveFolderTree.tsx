'use client'

import { tw } from '@/shared/lib'
import { useState } from 'react'
import { LuFolder } from 'react-icons/lu'
import { LuFileText } from 'react-icons/lu'

interface Props {
  type: 'folder' | 'file'
  data: {
    id: number
    name: string
    children?: {
      id: number
      name: string
    }[]
  }
  onSelect: (id: number) => void
  isSelected: boolean
}

export const ArchiveFolder = ({ type, data, onSelect, isSelected }: Props) => {
  const [selectFile, setSelectFile] = useState<number | null>(null) // 나중에 리팩토링 해야함
  const handleSelectFile = (id: number) => {
    setSelectFile(id)
  }
  return (
    <div className="cursor-pointer flex flex-col gap-2 text-sm ml-10 ">
      <div
        className={tw(
          'flex items-center gap-2.5 w-fit py-1 px-2 rounded-sm',
          isSelected && 'bg-green-light-active '
        )}
        onClick={() => {
          onSelect(data.id)
        }}>
        <LuFolder size={20} />
        <p>{data.name}</p>
      </div>
      {type === 'file' && (
        <div
          className={tw(
            'flex flex-col gap-1.5 ml-10',
            !isSelected && 'hidden'
          )}>
          {data.children &&
            data.children.map(item => (
              <div
                className={tw(
                  'flex items-center gap-2.5 w-fit py-1 px-2 rounded-sm',
                  selectFile === item.id && 'bg-green-light'
                )}
                key={item.id}
                onClick={() => {
                  handleSelectFile(item.id)
                }}>
                <LuFileText size={20} />
                <p>{item.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
