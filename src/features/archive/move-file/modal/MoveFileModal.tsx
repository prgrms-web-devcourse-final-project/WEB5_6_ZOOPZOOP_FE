'use client'

import { useState } from 'react'

import { LuFolder } from 'react-icons/lu'

import { useModalStore } from '@/shared/lib'
import { useArchiveFilesByFolderQuery } from '@/entities/archive/file/model/queries'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { ChevronsRight } from 'lucide-react'
import { ModalLayout } from '@/shared/ui'
import { FolderActionButtons } from '@/shared/ui/modal/create-folder/FolderActionButtons'
import { ArchiveFolder } from '@/shared/ui/modal'
import {
  useMoveManyArchiveFilesQuery,
  useMoveOneArchiveFilesQuery
} from '../model/queries'
import { showErrorToast } from '@/shared/ui/toast/Toast'

type SelectedFile = {
  folderId: number
  folderName: string
  files: { fileId: number; fileName: string }[]
}

export const MoveFileModal = () => {
  const [selectedSaveFolder, setSelectedSaveFolder] = useState<number | null>(
    null
  )
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const closeModal = useModalStore(s => s.closeModal)
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const { moveFile } = useMoveOneArchiveFilesQuery()
  const { moveFiles } = useMoveManyArchiveFilesQuery()
  const folderList = foldersQuery.data?.data || []
  //저장할 폴더
  const saveFolder = folderList.find(f => f.folderId === selectedSaveFolder)

  const handleSelectSaveFolder = (id: number) => setSelectedSaveFolder(id)

  const handleSelectFolder = (folderId: number) => {
    setSelectedFolder(folderId)
  }
  const onSelectFiles = ({
    folderId,
    folderName,
    fileId,
    fileName
  }: {
    folderId: number
    folderName: string
    fileId: number
    fileName: string
  }) => {
    setSelectedFiles(prev => {
      const existingFolder = prev.find(f => f.folderId === folderId)

      if (existingFolder) {
        const fileExists = existingFolder.files.some(
          file => file.fileId === fileId
        )

        // 이미 폴더 안에 해당 파일이 있으면 → "선택 해제"
        if (fileExists) {
          const updatedFiles = existingFolder.files.filter(
            file => file.fileId !== fileId
          )

          // 만약 폴더 안 파일이 하나도 안 남았으면 → 폴더 자체 제거
          if (updatedFiles.length === 0) {
            return prev.filter(f => f.folderId !== folderId)
          }

          // 남은 파일이 있으면 해당 폴더만 업데이트
          return prev.map(f =>
            f.folderId === folderId ? { ...f, files: updatedFiles } : f
          )
        }

        // 파일이 없을 경우 → 새 파일 추가
        return prev.map(f =>
          f.folderId === folderId
            ? { ...f, files: [...f.files, { fileId, fileName }] }
            : f
        )
      }

      // 폴더 자체가 없을 경우 → 새 폴더 추가
      return [
        ...prev,
        {
          folderId,
          folderName,
          files: [{ fileId, fileName }]
        }
      ]
    })
  }

  const handleMoveFiles = async () => {
    try {
      // 모든 폴더별로 API 요청 생성
      const promises = selectedFiles.map(item => {
        if (item.files.length === 1) {
          // 단건 이동
          return moveFile.mutateAsync({
            dataSourceId: item.files[0].fileId,
            folderId: item.folderId
          })
        } else if (item.files.length > 1) {
          // 다건 이동
          const request = {
            folderId: item.folderId,
            dataSourceId: item.files.map(f => f.fileId)
          }

          return moveFiles.mutateAsync(request)
        }
      })

      // 동시에 요청 실행 (Promise.all)
      await Promise.all(promises)

      // 성공 시 모달 닫기
      closeModal()
    } catch (error) {
      showErrorToast('파일 이동 중 오류 발생')
    }
  }

  // 선택한 폴더에 대한 파일 조회
  const { filesQuery } = useArchiveFilesByFolderQuery(selectedFolder!, {
    enabled: !!selectedFolder
  })

  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  // api 연동

  return (
    <ModalLayout size="lg">
      <div className=" w-full flex flex-col gap-2 min-h-[800px] ">
        <h1 className="text-2xl font-bold text-center">파일 이동</h1>
        <div className="flex justify-between">
          {/* 파일 위치 */}
          <div className=" w-1/2 flex flex-col gap-2.5 ">
            <h2 className="text-lg font-bold">이동할 파일 선택</h2>
            <div className="flex items-center gap-2 text-base">
              <LuFolder size={20} />
              <p>내 아카이브</p>
            </div>
            <div className="h-[400px] overflow-y-auto mb-5">
              {folderList.map(folder => (
                <ArchiveFolder
                  key={folder.folderId}
                  type="file"
                  mode="select"
                  data={{
                    id: folder.folderId,
                    name: folder.folderName,
                    children: filesForArchiveFolder
                  }}
                  onFolderSelect={handleSelectFolder}
                  onFileSelect={onSelectFiles}
                  isSelected={selectedFolder === folder.folderId}
                />
              ))}
            </div>

            {/* 선택된 파일 경로 */}
            <div className="h-[300px]  overflow-y-auto ">
              {selectedFiles.map((folderItem, folderIdx) =>
                folderItem.files.map((fileItem, fileIdx) => (
                  <div
                    key={`${folderIdx}-${fileIdx}`}
                    className="flex border border-gray-light rounded-md py-3 px-3 mb-2 text-base bg-gray-light 
                   whitespace-nowrap overflow-hidden text-ellipsis">
                    <p className="truncate">
                      내 아카이브/{folderItem.folderName}/{fileItem.fileName}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center">
            <ChevronsRight
              size={50}
              className="text-green-normal"
            />
          </div>
          {/* 이동할 위치  => 폴더만 선택 가능 , 폴더 id만 추출해야됨*/}
          <div className=" w-1/2 flex flex-col gap-2.5 ">
            <h2 className=" text-lg font-bold">이동할 위치 선택</h2>
            <div className="flex items-center gap-2 text-base">
              <LuFolder size={20} />
              <p>내 아카이브</p>
            </div>
            <div className="h-[400px] overflow-y-auto mb-5">
              {folderList.map(folder => (
                <ArchiveFolder
                  key={folder.folderId}
                  type="folder"
                  mode="move"
                  data={{ id: folder.folderId, name: folder.folderName }}
                  onFolderSelect={handleSelectSaveFolder}
                  isSelected={selectedSaveFolder === folder.folderId}
                />
              ))}
            </div>
            {/* 현재 폴더 경로 */}
            <div className="w-full flex flex-col gap-2.5">
              {saveFolder && (
                <div className="border border-gray-light rounded-md py-3 px-3 text-base bg-gray-light">
                  `내 아카이브/${saveFolder.folderName}`
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 버튼 */}

        <FolderActionButtons
          onCancel={closeModal}
          onCreate={handleMoveFiles}
          isCreating={false}
          label={'이동'}
          // disabled={checkedPaths.length === 0}
        />
      </div>
    </ModalLayout>
  )
}
