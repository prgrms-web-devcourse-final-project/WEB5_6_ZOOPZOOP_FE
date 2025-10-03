'use client'

import { useArchiveFilesByPage } from '@/entities/archive/file/model/hook/useFilesByPage'
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
  // TODO : 김정주
  const selectedFolder = foldersQuery.data?.data?.find(
    f => f.folderName === folderName
  )

  const { filesQuery } = useArchiveFilesByPage({
    folderId: Number(selectedFolder?.folderId),
    page: 0,
    size: 20,
    enabled: !!selectedFolder
  })
  if (!filesQuery.data?.data) return <p>등록된 파일이 없습니다.</p>

  return (
    <>
      <Header
        title={folderName}
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />

      <div className="flex flex-col p-6 gap-4">
        <FolderSection folderList={foldersQuery.data?.data ?? []} />
        <FileSection
          initialFileList={filesQuery.data?.data ?? []}
          initialPageInfo={filesQuery.data.pageInfo}
        />
      </div>
    </>
  )
}
