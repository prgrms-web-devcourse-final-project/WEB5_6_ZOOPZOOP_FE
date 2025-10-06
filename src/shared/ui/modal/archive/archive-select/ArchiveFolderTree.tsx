'use client'

import { tw } from '@/shared/lib'
import { useState } from 'react'
import { LuFolder } from 'react-icons/lu'
import { LuFileText } from 'react-icons/lu'

interface Props {
  mode: 'select' | 'move'
  type: 'folder' | 'file'
  data: {
    id: number
    name: string
    children?: {
      id: number
      name: string
    }[]
  }
  onFolderSelect: (folderId: number) => void
  onFileSelect?: ({
    folderId,
    folderName,
    fileId,
    fileName
  }: {
    folderId: number
    folderName: string
    fileId: number
    fileName: string
  }) => void
  isSelected: boolean
}

export const ArchiveFolder = ({
  mode,
  type,
  data,
  isSelected,
  onFolderSelect,
  onFileSelect
}: Props) => {
  const [selectFile, setSelectFile] = useState<number | null>(null) // 나중에 리팩토링 해야함
  const handleSelectFile = (
    folderId: number,
    folderName: string,
    fileId: number,
    fileName: string
  ) => {
    setSelectFile(fileId)
    if (onFileSelect) onFileSelect({ folderId, folderName, fileId, fileName })
  }
  return (
    <div className="cursor-pointer flex flex-col gap-2 text-sm ml-10">
      <div
        className={tw(
          'flex items-center gap-2.5 w-fit py-1 px-2 rounded-sm',
          isSelected && mode === 'select' && 'bg-green-light-active ',
          isSelected && mode === 'move' && 'bg-orange-accent'
        )}
        onClick={() => {
          onFolderSelect(data.id)
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
                  'flex items-center gap-2.5 w-full py-1 px-2 rounded-sm',
                  selectFile === item.id && 'bg-green-light'
                )}
                key={item.id}
                onClick={() => {
                  handleSelectFile(data.id, data.name, item.id, item.name)
                }}>
                <LuFileText size={20} />
                <p className="truncate">{item.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
