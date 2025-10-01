'use client'

import { useArchiveFiles } from '@/entities/archive/file/model/hook/useFiles'
import { useArchiveFolders } from '@/entities/archive/folder/model/hook/useFolders'
import { Header } from '@/shared/ui/header'
import { Button } from '@/shared/ui/header/Header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'
import { useParams } from 'next/navigation'

const buttons: Button[] = [
  {
    label: '폴더 생성'
  },
  {
    label: '파일 업로드'
  }
]

export default function ArchiveFolderDetailContents() {
  const { folder } = useParams()
  const { foldersQuery } = useArchiveFolders()

  const folderName = folder ? decodeURIComponent(String(folder)) : ''
  const selectedFolderId = foldersQuery.data?.data.folders.find(
    f => f.folderName === folderName
  )

  const { filesQuery } = useArchiveFiles(selectedFolderId?.folderId ?? -1, {
    enabled: !!selectedFolderId
  })

  if (filesQuery.isLoading) return <p>파일 불러오는 중...</p>
  if (filesQuery.isError) return <p>파일 불러오기 실패</p>

  if (!selectedFolderId) return <p>선택한 폴더 없음</p>

  return (
    <>
      <Header
        title={folderName}
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />

      <div className="flex flex-col p-6 gap-4">
        <FolderSection folderList={foldersQuery.data?.data.folders ?? []} />
        <FileSection fileList={filesQuery.data?.data?.files ?? []} />
        <Pagination totalPages={5} />
      </div>
    </>
  )
}
