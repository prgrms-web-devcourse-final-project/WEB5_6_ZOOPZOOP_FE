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
  MoveToArchiveTrashModal,
  DeleteFolderModal
} from '@/features/archive'
import {
  CopyToSpaceModal,
  DeleteSpaceFileModal,
  MoveToSpaceTrashModal,
  RestoreSpaceFileModal
} from '@/features/shared-archive'

export const GlobalModal = () => {
  const [modal, isOpen] = useModalStore(useShallow(s => [s.modal, s.isOpen]))

  if (!isOpen || !modal) return null

  switch (modal.type) {
    case 'upload-archive-url':
      return <UrlUploadModal />
    case 'archive-select':
      return <ArchiveSelectModal />
    case 'alarm':
      return <AlarmModal />
    case 'create-space':
      return <CreateSpaceModal />
    case 'create-folder':
      return <CreateFolderModal />
    case 'move-archive-file':
      return <MoveFileModal />
    case 'go-to-archive-trash':
      return <MoveToArchiveTrashModal />
    case 'go-to-space-trash':
      return <MoveToSpaceTrashModal {...modal.props} />
    case 'delete-account':
      return <DeleteAccountModal />
    case 'copy-to-space':
      return <CopyToSpaceModal />
    case 'edit-archive-file':
      return <EditFileModal {...modal.props} />
    case 'delete-archive-file':
      return <DeleteFileModal {...modal.props} />
    case 'delete-space-file':
      return <DeleteSpaceFileModal {...modal.props} />
    case 'delete-folder':
      return <DeleteFolderModal {...modal.props} />
    case 'restore-archive-file':
      return <RestoreFileModal {...modal.props} />
    case 'restore-space-file':
      return <RestoreSpaceFileModal {...modal.props} />
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
