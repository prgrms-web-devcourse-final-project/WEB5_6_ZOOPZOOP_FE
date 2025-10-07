'use client'

import { useRef, useState } from 'react'
import { ModalLayout } from '../../ModalLayout'
import { ArchiveFolder } from '../archive-select/ArchiveFolderTree'
import { LuFolder } from 'react-icons/lu'
import { FolderActionButtons } from '../../create-folder/FolderActionButtons'
import { useModalStore } from '@/shared/lib'
import { postArchiveFileClient } from '@/entities/archive/file/api/file.client'
import { useRouter } from 'next/navigation'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { showSuccessToast } from '@/shared/ui/toast/Toast'

export const UrlUploadModal = () => {
  const urlRef = useRef<HTMLInputElement>(null)
  const [selectedFolder, setSelectedFolder] = useState<number>(0)
  const closeModal = useModalStore(s => s.closeModal)
  const handleSelectFolder = (id: number) => {
    setSelectedFolder(id)
  }
  const router = useRouter()
  // 폴더 구조 가져오기
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data

  const handlePost = async () => {
    await postArchiveFileClient(selectedFolder, urlRef.current!.value!)
    showSuccessToast('파일 업로드 성공')
    closeModal()
    router.refresh()
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">링크 업로드</h1>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">저장 위치</h2>
        <div className="flex items-center gap-2 text-base">
          <LuFolder size={20} />
          <p>내 아카이브</p>
        </div>

        <div className="max-h-60 overflow-y-auto pr-1">
          {folderList &&
            folderList.map(item => (
              <ArchiveFolder
                key={item.folderId}
                type="folder"
                mode="select"
                data={{ id: item.folderId, name: item.folderName }}
                onFolderSelect={handleSelectFolder}
                isSelected={selectedFolder === item.folderId}
              />
            ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2.5">
        {/* 현재 폴더 위치가 나와야되며 클릭하기 전까지 비활성화  */}
        {/* <input
          type="text"
          className="border border-gray-light rounded-md py-3 px-3 text-base"
          placeholder={
            selectedFolder
              ? `내 아카이브/${folderList?.find(f => f.folderId === selectedFolder)?.folderName}`
              : '현재 폴더 위치'
          }
        /> */}
      </div>

      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">URL</h2>
        <input
          ref={urlRef}
          type="text"
          className="border border-gray-light rounded-md py-3 px-3 text-base"
          placeholder="URL을 입력해 주세요"
        />
      </div>
      <FolderActionButtons
        label="업로드"
        onCancel={closeModal}
        onCreate={handlePost}
        isCreating={false}
        disabled={false}
      />
    </ModalLayout>
  )
}
