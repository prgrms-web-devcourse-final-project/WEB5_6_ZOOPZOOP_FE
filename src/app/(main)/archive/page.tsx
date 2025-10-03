import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { getInitialFolderList } from '@/entities/archive/folder/api/folder.ssr'
import Header, { Button } from '@/shared/ui/header/Header'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'

const DEFAULT_PAGE_SIZE = 8
const ROOT_FOLDER_ID = 0
const INITIAL_PAGE = 0

export default async function Archive() {
  const { data } = await getInitialFolderList()
  const fileResponse = await getInitialFileList({
    page: INITIAL_PAGE,
    size: DEFAULT_PAGE_SIZE,
    folderId: ROOT_FOLDER_ID
  })

  const buttons: Button[] = [
    {
      label: '폴더 생성'
    },
    {
      label: '파일 업로드'
    }
  ]

  return (
    <div>
      <Header
        title="내 아카이브"
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="w-full flex flex-col p-8 gap-4 ">
        <FolderSection folderList={data ?? []} />
        <FileSection
          folderId={ROOT_FOLDER_ID}
          initialFileList={(fileResponse && fileResponse.data) ?? []}
          initialPageInfo={fileResponse && fileResponse.pageInfo}
        />
      </div>
    </div>
  )
}
