'use client'

import { useState } from 'react'
import { ModalLayout } from '../ModalLayout'
import { useModalStore } from '@/shared/lib'
import { FolderNameInput } from '../create-folder/FolderNameInput'
import { FolderActionButtons } from '../create-folder/FolderActionButtons'
import { useArchiveFolders } from '@/entities/archive/folder/model/hook/useFolders'

interface Props {
  folderId: number
  folderName: string
}

export const RenameFolderModal = ({ folderId, folderName }: Props) => {
  const [newFolderName, setFolderName] = useState(folderName)
  const closeModal = useModalStore(s => s.closeModal)
  const { updateFolderName } = useArchiveFolders()

  const handleRename = () => {
    updateFolderName.mutate(
      {
        folderId: folderId,
        folderName: newFolderName
      },
      {
        onSuccess: closeModal
      }
    )
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">폴더 이름 수정</h1>
      <div className="w-full flex flex-col gap-2.5">
        <FolderNameInput
          value={newFolderName}
          onChange={setFolderName}
        />
      </div>
      <FolderActionButtons
        onCancel={closeModal}
        onCreate={handleRename}
        isCreating={false}
        disabled={!folderName.trim()}
      />
    </ModalLayout>
  )
}
