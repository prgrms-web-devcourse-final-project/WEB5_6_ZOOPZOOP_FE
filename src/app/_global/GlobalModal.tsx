'use client'

import { useModalStore } from '@/shared/lib'
import { useShallow } from 'zustand/shallow'
import { DeleteAccountModal } from '@/features/auth/ui/DeleteAccountModal'
import {
  AlarmModal,
  ArchiveSelectModal,
  CreateFolderModal,
  UrlUploadModal
} from '@/shared/ui/modal'
import { CreateSpaceModal } from '@/features/space'

export const GlobalModal = () => {
  const [type, isOpen] = useModalStore(useShallow(s => [s.type, s.isOpen]))

  if (!isOpen) return null

  switch (type) {
    case 'url-upload':
      return <UrlUploadModal />
    case 'archive-select':
      return <ArchiveSelectModal />
    case 'alarm':
      return <AlarmModal />
    case 'create-space':
      return <CreateSpaceModal />
    case 'create-folder':
      return <CreateFolderModal />
    case 'delete-account':
      return <DeleteAccountModal />
    default:
      return null
  }
}
