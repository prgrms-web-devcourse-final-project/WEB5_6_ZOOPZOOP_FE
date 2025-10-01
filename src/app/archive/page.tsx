import { fetchArchiveFilesServer } from '@/entities/archive/file/api/file.server'
import { fetchArchiveFolderServer } from '@/entities/archive/folder/api/folder.server'

import Header, { Button } from '@/shared/ui/header/Header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'

export default async function Archive() {
  const { data } = await fetchArchiveFolderServer()

  const fileResponse = await fetchArchiveFilesServer(0)

  const buttons: Button[] = [
    {
      label: '폴더 생성'
    },
    {
      label: '파일 업로드'
    }
  ]

  return (
    <>
      <Header
        title="내 아카이브"
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FolderSection folderList={data.folders} />
        <FileSection
          fileList={(fileResponse && fileResponse.data.files) ?? []}
        />
        <Pagination totalPages={5} />
      </div>
    </>
  )
}
