'use client'

import { useRef } from 'react'
import { ModalLayout } from '@/shared/ui'
import { ArchiveFolder } from '@/shared/ui/modal'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { useUrlUploadFolderState } from '../../model/useUrlUploadFolderState'
import { useUrlUploadAction } from '../../model/useUrlUploadAction'
import { FolderOpen } from 'lucide-react'

export const UrlUploadModal = () => {
  const urlRef = useRef<HTMLInputElement>(null)

  const { selectedFolder, folderList, handleSelectFolder } =
    useUrlUploadFolderState()

  const { handlePost, isPending } = useUrlUploadAction()
  const handleUpload = () => {
    if (!selectedFolder || !urlRef.current?.value?.trim()) return

    handlePost({
      folderId: selectedFolder.folderId,
      folderName: selectedFolder.folderName,
      sourceUrl: urlRef.current.value
    })
  }

  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">링크 업로드</h1>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">저장 위치</h2>
        <div className="flex items-center gap-2 text-base">
          <FolderOpen size={20} />
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
                isSelected={selectedFolder?.folderId === item.folderId}
              />
            ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">URL</h2>
        <input
          ref={urlRef}
          onKeyDown={e => {
            if (e.key === 'Enter') handleUpload()
          }}
          type="text"
          className="border border-gray-300 rounded-lg py-3 px-4 text-base 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     transition-all duration-200
                     placeholder:text-gray-400
                     disabled:bg-gray-50 disabled:cursor-not-allowed"
          placeholder="URL을 입력해 주세요"
          autoFocus
        />
      </div>
      <FolderActionButtons
        label="업로드"
        onCreate={handleUpload}
        isCreating={isPending}
        disabled={false}
      />
    </ModalLayout>
  )
}
