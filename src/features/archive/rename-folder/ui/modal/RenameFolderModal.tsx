'use client'

import { useState } from 'react'
import { ModalLayout } from '@/shared/ui'
import { FolderNameInput } from '@/shared/ui/modal/create-folder/FolderNameInput'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useRenameAction } from '../../model/useRenameAction'
import ModalLoading from '@/shared/ui/loading/ModalLoading'

interface Props {
  folderId: number
  folderName: string
}

export const RenameFolderModal = ({ folderId, folderName }: Props) => {
  const [newFolderName, setFolderName] = useState(folderName)
  const { handleRename, isPending } = useRenameAction()

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">폴더 이름 수정</h1>

      {!isPending ? (
        <div className="w-full flex flex-col gap-2.5">
          <FolderNameInput
            value={newFolderName}
            onChange={setFolderName}
            onEnter={() => handleRename(folderId, newFolderName)}
            autoFocus
          />
        </div>
      ) : (
        <ModalLoading />
      )}
      <FolderActionButtons
        label="수정"
        onCreate={() => handleRename(folderId, newFolderName)}
        isCreating={isPending}
        disabled={!folderName.trim()}
      />
    </ModalLayout>
  )
}
