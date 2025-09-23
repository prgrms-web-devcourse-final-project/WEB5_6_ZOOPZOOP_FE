'use client'

import { useState } from 'react'
import { ModalLayout } from '../ModalLayout'
import { FolderNameInput } from './FolderNameInput'
import { FolderActionButtons } from './FolderActionButtons'

export const CreateFolderModal = () => {
  const [folderName, setFolderName] = useState('')

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
        onCancel={() => {}}
        onCreate={() => {}}
        isCreating={false}
        disabled={!folderName.trim()}
      />
    </ModalLayout>
  )
}
