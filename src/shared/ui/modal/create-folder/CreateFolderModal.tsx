'use client'

import { useState } from 'react'
import { ModalLayout } from '../ModalLayout'
import { FolderNameInput } from './FolderNameInput'
import { FolderActionButtons } from './FolderActionButtons'
import { useModalStore } from '@/shared/lib'
import { usePostArchiveFolderQuery } from '@/entities/archive/folder'
import { showSuccessToast } from '../../toast/Toast'
import { useRouter } from 'next/navigation'

export const CreateFolderModal = () => {
  const router = useRouter()
  const [folderName, setFolderName] = useState('')
  const closeModal = useModalStore(s => s.closeModal)
  const { addFolder } = usePostArchiveFolderQuery()

  const handleCreate = () => {
    if (!folderName.trim() || addFolder.isPending) return

    addFolder.mutate(folderName, {
      onSuccess: response => {
        const folderId = response.data?.folderId
        showSuccessToast('폴더 생성 완료')
        closeModal()
        router.push(`/archive/${folderId}?name=${folderName}`)
      }
    })
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center ">폴더 생성</h1>
      <div className="w-full flex flex-col gap-2.5">
        <FolderNameInput
          value={folderName}
          onChange={setFolderName}
          onEnter={handleCreate}
          autoFocus
        />
      </div>
      <FolderActionButtons
        label="생성"
        onCreate={handleCreate}
        isCreating={addFolder.isPending}
        disabled={!folderName.trim()}
      />
    </ModalLayout>
  )
}
