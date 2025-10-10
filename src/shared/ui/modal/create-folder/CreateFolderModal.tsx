'use client'

import { useState } from 'react'
import { ModalLayout } from '../ModalLayout'
import { FolderNameInput } from './FolderNameInput'
import { FolderActionButtons } from './FolderActionButtons'
import { useModalStore } from '@/shared/lib'
import { usePostArchiveFolderQuery } from '@/entities/archive/folder'
import { showSuccessToast } from '../../toast/Toast'

export const CreateFolderModal = () => {
  const [folderName, setFolderName] = useState('')
  const closeModal = useModalStore(s => s.closeModal)
  const { addFolder } = usePostArchiveFolderQuery()
  const handleCreate = () => {
    addFolder.mutate(folderName, {
      onSuccess: () => {
        showSuccessToast('폴더 생성 완료')
        closeModal()
      }
    })
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
        label="생성"
        onCancel={closeModal}
        onCreate={handleCreate}
        isCreating={false}
        disabled={!folderName.trim()}
      />
    </ModalLayout>
  )
}
