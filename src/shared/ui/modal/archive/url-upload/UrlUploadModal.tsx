'use client'

import { useState } from 'react'
import { ModalLayout } from '../../ModalLayout'
import { ArchiveFolder } from '../archive-select/ArchiveFolderTree'

import { LuFolder } from 'react-icons/lu'
import archiveData from '../data'

export const UrlUploadModal = () => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)
  const handleSelectFolder = (id: number) => {
    setSelectedFolder(id)
  }
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">링크 업로드</h1>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">저장 위치</h2>
        <div className="flex items-center gap-2 text-base">
          <LuFolder size={20} />
          <p>내 아카이브</p>
        </div>
        {archiveData.map(item => (
          <ArchiveFolder
            key={item.id}
            type="folder"
            data={item}
            onSelect={handleSelectFolder}
            isSelected={selectedFolder === item.id}
          />
        ))}
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">URL</h2>
        <input
          type="text"
          className="border border-gray-light rounded-md py-3 px-3 text-base"
          placeholder="URL을 입력해 주세요"
        />
      </div>
    </ModalLayout>
  )
}
