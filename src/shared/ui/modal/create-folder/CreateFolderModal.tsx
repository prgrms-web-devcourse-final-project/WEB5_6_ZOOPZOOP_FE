'use client'

import { useState } from 'react'
import { ModalLayout } from '../ModalLayout'
import { FolderNameInput } from './FolderNameInput'
import { FolderActionButtons } from './FolderActionButtons'
import { useModalStore } from '@/shared/lib'
import { postArchiveFolderClient } from '@/entities/archive/folder/api/folder.client'
// import {
//   createArchiveFolder,
//   postArchiveFolder
// } from '@/entities/archive/folder/api/folder.server'

export const CreateFolderModal = () => {
  const [folderName, setFolderName] = useState('')
  const closeModal = useModalStore(s => s.closeModal)
  const handleCreate = async () => {
    await postArchiveFolderClient(folderName)
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">폴더 생성</h1>
      <div className="w-full flex flex-col gap-2.5">
        <FolderNameInput
          value={folderName}
          onChange={setFolderName}
        />
      </div>
      <FolderActionButtons
        onCancel={closeModal}
        onCreate={handleCreate}
        isCreating={false}
        disabled={!folderName.trim()}
      />
    </ModalLayout>
  )
}
