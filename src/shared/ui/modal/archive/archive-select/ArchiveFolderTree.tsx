'use client'

import { tw } from '@/shared/lib'
import { LuFolder, LuFileText } from 'react-icons/lu'

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
  onFolderSelect: (folderId: number, folderName: string) => void
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
  /** 선택된 파일 목록 (폴더 이름과 파일 이름 포함) */
  selectedFiles?: {
    folderName: string
    files: { fileId: number; fileName: string }[]
  }[]
}

export const ArchiveFolder = ({
  mode,
  type,
  data,
  isSelected,
  onFolderSelect,
  onFileSelect,
  selectedFiles = []
}: Props) => {
  /**이 폴더에 속한 선택된 파일 ID 목록 추출 */
  const selectedFileIds =
    selectedFiles
      .find(f => f.folderName === data.name)
      ?.files.map(file => file.fileId) || []

  return (
    <div className="cursor-pointer flex flex-col gap-2 text-sm ml-5 box-border">
      <div
        className={tw(
          'flex items-center gap-4 w-fit py-1 px-2 rounded-sm',
          isSelected && mode === 'select' && 'bg-green-light-active',
          isSelected && mode === 'move' && 'bg-orange-accent'
        )}
        onClick={() => {
          onFolderSelect(data.id, data.name)
        }}>
        <LuFolder size={20} />
        <p>{data.name}</p>
      </div>

      {type === 'file' && (
        <div
          className={tw(
            'flex flex-col gap-1.5 ml-5 transition-all duration-200',
            !isSelected && 'hidden'
          )}>
          {data.children?.map(item => {
            const isFileSelected = selectedFileIds.includes(item.id)
            return (
              <div
                key={item.id}
                className={tw(
                  'flex items-center gap-2.5 py-1 px-2 rounded-sm',
                  isFileSelected && 'bg-green-light'
                )}
                onClick={() => {
                  if (onFileSelect) {
                    onFileSelect({
                      folderId: data.id,
                      folderName: data.name,
                      fileId: item.id,
                      fileName: item.name
                    })
                  }
                }}>
                <LuFileText size={20} />
                <p className="truncate">{item.name}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
