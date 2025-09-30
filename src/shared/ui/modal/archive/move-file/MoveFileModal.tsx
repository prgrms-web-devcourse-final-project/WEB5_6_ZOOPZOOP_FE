'use client'

import { useState } from 'react'
import { ModalLayout } from '../../ModalLayout'
import { ArchiveFolder } from '../archive-select/ArchiveFolderTree'

import { LuFolder } from 'react-icons/lu'
import archiveData from '../data'
import { FolderActionButtons } from '../../create-folder/FolderActionButtons'
import { useModalStore } from '@/shared/lib'
import { SelectItem } from '../SelectedFileItem'

export const MoveFileModal = () => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)
  const closeModal = useModalStore(s => s.closeModal)
  const handleSelectFolder = (id: number) => {
    setSelectedFolder(id)
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">파일 이동</h1>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">이동할 위치</h2>
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
        {/* 현재 폴더 위치가 나와야되며 클릭하기 전까지 비활성화  */}
        <input
          type="text"
          className="border border-gray-light rounded-md py-3 px-3 text-base"
          placeholder="현재 폴더 위치"
        />
      </div>

      <div className="w-full h-[40%] flex flex-col gap-2.5 overflow-y-auto">
        <h2 className="text-lg font-bold">이동할 파일</h2>
        {/* <input
          type="text"
          className="border border-gray-light rounded-md py-3 px-3 text-base"
          placeholder="URL을 입력해 주세요"
        /> */}
        <SelectItem />
      </div>
      <FolderActionButtons
        onCancel={closeModal}
        onCreate={() => {}}
        isCreating={false}
        disabled={false}
      />
    </ModalLayout>
  )
}
