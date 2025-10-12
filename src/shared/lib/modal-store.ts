import { FileData } from '@/entities/archive/file'
import { CheckedFile } from '@/features/archive/move-file/model/type'
import { create } from 'zustand'

type ModalType =
  | { type: 'upload-archive-url' }
  | { type: 'archive-select' }
  | { type: 'alarm' }
  | { type: 'create-space' }
  | { type: 'create-folder' }
  | {
      type: 'move-archive-file'
    }
  | { type: 'delete-account' }
  | { type: 'copy-to-space' }
  | { type: 'go-to-archive-trash' }
  | { type: 'go-to-space-trash'; props: { dataSourceId: number[] } }
  | { type: 'edit-archive-file'; props: { fileData: FileData } }
  | { type: 'delete-archive-file'; props: { selectedFiles: CheckedFile[] } }
  | { type: 'delete-space-file'; props: { dataSourceId: number[] } }
  | { type: 'restore-archive-file'; props: { selectedFiles: CheckedFile[] } }
  | { type: 'restore-space-file'; props: { dataSourceId: number[] } }
  | {
      type: 'add-member'
      props: {
        spaceId: number
      }
    }
  | {
      type: 'rename-folder'
      props: {
        folderId: number
        folderName: string
      }
    }
  | {
      type: 'delete-space'
      props: {
        spaceId: number
        title: string
      }
    }
  | {
      type: 'expel-member'
      props: {
        spaceId: number
        name: string
        memberId: number
      }
    }
  | {
      type: 'leave-space'
      props: {
        spaceId: number
      }
    }
  | {
      type: 'delete-folder'
      props: {
        folderId: number
        folderName: string
      }
    }

interface ModalStore {
  modal: ModalType | null
  isOpen: boolean
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>(set => ({
  modal: null,
  isOpen: false,
  openModal: modal => set({ modal, isOpen: true }),
  closeModal: () => set({ modal: null, isOpen: false })
}))
