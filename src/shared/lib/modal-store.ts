import { create } from 'zustand'

type ModalType =
  | { type: 'url-upload' }
  | { type: 'archive-select' }
  | { type: 'alarm' }
  | { type: 'create-space' }
  | { type: 'create-folder' }
  | {
      type: 'move-file'
    }
  | { type: 'delete-account' }
  | { type: 'go-to-trash' }
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
