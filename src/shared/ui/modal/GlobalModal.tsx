'use client'

import { useModalStore } from '@/shared/lib'
import { useShallow } from 'zustand/shallow'
import { UrlUploadModal } from './archive/url-upload/UrlUploadModal'
import { ArchiveSelectModal } from './archive/archive-select/ArchiveSelectModal'
import { AlarmModal } from './alarm/AlarmModal'
import { CreateSpaceModal } from './create-space/CreateSpaceModal'
import { CreateFolderModal } from './create-folder/CreateFolderModal'
import { DeleteAccountModal } from '@/features/auth/ui/DeleteAccountModal'
import { MoveFileModal } from './archive/move-file/MoveFileModal'
import { RenameFolderModal } from './rename-folder/RenameFolderModal'

export const GlobalModal = () => {
  const [modal, isOpen] = useModalStore(useShallow(s => [s.modal, s.isOpen]))

  if (!isOpen || !modal) return null

  switch (modal.type) {
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
    case 'move-file':
      return <MoveFileModal />
    case 'delete-account':
      return <DeleteAccountModal />
    case 'rename-folder':
      return <RenameFolderModal {...modal.props} />
    default:
      return null
  }
}
