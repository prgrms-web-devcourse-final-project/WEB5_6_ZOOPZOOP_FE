import { useMoveFileModalState } from '@/features/archive/move-file/model/useMoveFileModalState'
import { useSpaceStore } from '@/entities/space'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useFetchAllSpacesQuery } from './queries'
import { FolderData } from '@/entities/archive/folder'
import { useArchiveFilesByFolderQuery } from '@/entities/archive/file/model/queries'

export function useCopyToSpaceState() {
  const pathname = usePathname()
  const isSpacePage = pathname.includes('/space')
  const { currentSpace } = useSpaceStore()
  const { spaces } = useFetchAllSpacesQuery()

  const {
    folderList,
    selectedFolder,
    selectedSaveFolder,
    selectedFiles,
    handleSelectFolder,
    handleSelectSaveFolder,
    onSelectFiles
  } = useMoveFileModalState()

  const spaceList: FolderData[] =
    spaces?.spaces
      //  권한이 ADMIN 또는 READ_WRITE인 항목만 필터링
      .filter(
        item => item.authority === 'ADMIN' || item.authority === 'READ_WRITE'
      )
      // FolderData 형태로 변환
      .map(item => ({
        folderId: item.id,
        folderName: item.name
      })) ?? []

  const saveFolder = folderList?.find(
    f => f.folderId === selectedSaveFolder?.folderId
  )
  const { filesQuery } = useArchiveFilesByFolderQuery(
    selectedFolder.folderId!,
    {
      enabled: !!selectedFolder
    }
  )
  const filesForArchiveFolder =
    filesQuery.data?.files.map(file => ({
      id: file.dataSourceId,
      name: file.title
    })) || []

  // 현재 스페이스 페이지에서 기본 저장 폴더 설정
  useEffect(() => {
    if (isSpacePage && currentSpace && selectedSaveFolder === null) {
      handleSelectSaveFolder(currentSpace.spaceId, currentSpace.spaceName)
    }
  }, [isSpacePage, currentSpace, selectedSaveFolder, handleSelectSaveFolder])

  return {
    spaceList,
    folderList,
    filesForArchiveFolder,
    saveFolder,
    selectedFolder,
    selectedSaveFolder,
    selectedFiles,
    handleSelectFolder,
    handleSelectSaveFolder,
    onSelectFiles
  }
}
