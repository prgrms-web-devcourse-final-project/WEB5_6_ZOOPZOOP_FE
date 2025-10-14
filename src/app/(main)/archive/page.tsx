import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { getInitialFolderList } from '@/entities/archive/folder/api/folder.ssr'
import Header, { Button } from '@/shared/ui/header/Header'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'

const ROOT_FOLDER_ID = 0
const INITIAL_PAGE = 1

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function Archive({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Number(params?.page) || INITIAL_PAGE

  const folderList = await getInitialFolderList()
  const defaultFolder = folderList.find(item => item.folderName === 'default')

  const initialFileData = await getInitialFileList({
    page: currentPage,
    folderId: defaultFolder?.folderId
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
        <FolderSection folderList={folderList ?? []} />
        <FileSection
          folderId={ROOT_FOLDER_ID}
          mode="archive"
          initialFileData={initialFileData}
          initialPage={currentPage}
        />
      </div>
    </div>
  )
}
