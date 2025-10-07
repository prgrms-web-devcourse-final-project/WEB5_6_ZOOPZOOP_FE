'use client'

import { useModalStore } from '@/shared/lib'
import { useShallow } from 'zustand/shallow'
import {
  AlarmModal,
  ArchiveSelectModal,
  CreateFolderModal,
  UrlUploadModal
} from '@/shared/ui/modal'
import {
  CreateSpaceModal,
  DeleteSpaceModal,
  AddMemberModal
} from '@/features/space'
import { MoveFileModal } from '@/shared/ui/modal/archive/move-file/MoveFileModal'
import { RenameFolderModal } from '@/shared/ui/modal/rename-folder/RenameFolderModal'
import { DeleteAccountModal } from '@/features/auth'

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
    case 'delete-space':
      return <DeleteSpaceModal {...modal.props} />
    case 'add-member':
      return <AddMemberModal {...modal.props} />
    default:
      return null
  }
}
