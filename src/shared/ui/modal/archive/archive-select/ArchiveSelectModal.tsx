'use client'

import { ModalLayout } from '../../ModalLayout'

import { LuFolder } from 'react-icons/lu'
import { ArchiveFolder } from './ArchiveFolderTree'
import { FileUploadZone } from './FileUploadZone'
import archiveData from '../data'
import { useState } from 'react'

export const ArchiveSelectModal = () => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)
  const handleSelectFolder = (id: number) => {
    setSelectedFolder(id)
  }
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">아카이브 업로드</h1>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">가져올 위치</h2>
        <div className="flex items-center gap-2 text-base">
          <LuFolder size={20} />
          <p>내 아카이브</p>
        </div>
        {archiveData.map(item => (
          <ArchiveFolder
            key={item.id}
            type="file"
            data={item}
            mode="select"
            onFolderSelect={handleSelectFolder}
            isSelected={selectedFolder === item.id}
          />
        ))}
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <FileUploadZone />
        <div className="flex flex-col gap-2.5">
          {/* <SelectItem />
          <SelectItem />
          <SelectItem /> */}
        </div>
      </div>
    </ModalLayout>
  )
}
