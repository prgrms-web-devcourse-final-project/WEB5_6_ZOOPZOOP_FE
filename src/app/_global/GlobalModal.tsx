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
  AddMemberModal,
  ExpelMemberModal,
  LeaveSpaceModal
} from '@/features/space'

import { RenameFolderModal } from '@/shared/ui/modal/rename-folder/RenameFolderModal'
import { DeleteAccountModal } from '@/features/auth'

import {
  EditFileModal,
  DeleteFileModal,
  RestoreFileModal,
  MoveFileModal,
  MoveToTrashModal,
  CopyToSpaceModal,
  DeleteFolderModal
} from '@/features/archive'

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
    case 'go-to-trash':
      return <MoveToTrashModal />
    case 'delete-account':
      return <DeleteAccountModal />
    case 'copy-to-space':
      return <CopyToSpaceModal />
    case 'edit-file':
      return <EditFileModal {...modal.props} />
    case 'delete-file':
      return <DeleteFileModal {...modal.props} />
    case 'delete-folder':
      return <DeleteFolderModal {...modal.props} />
    case 'restore-file':
      return <RestoreFileModal {...modal.props} />
    case 'rename-folder':
      return <RenameFolderModal {...modal.props} />
    case 'delete-space':
      return <DeleteSpaceModal {...modal.props} />
    case 'add-member':
      return <AddMemberModal {...modal.props} />
    case 'expel-member':
      return <ExpelMemberModal {...modal.props} />
    case 'leave-space':
      return <LeaveSpaceModal {...modal.props} />
    default:
      return null
  }
}
