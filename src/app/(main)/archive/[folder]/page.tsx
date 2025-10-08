import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { getInitialFolderList } from '@/entities/archive/folder/api/folder.ssr'
import { Header } from '@/shared/ui/header'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'
export async function generateMetadata({
  params
}: {
  params: Promise<{ folder: string }>
}) {
  const { folder } = await params
  return { title: folder }
}

interface Props {
  searchParams: { page?: string }
  params: { folder: string }
}

const DEFAULT_PAGE_SIZE = 8
const INITIAL_PAGE = 1
const ROOT_FOLDER_ID = 0

export default async function ArchiveFolderPage({
  searchParams,
  params
}: Props) {
  const page = await searchParams
  const { folder } = await params
  const currentPage = Number(page?.page) || INITIAL_PAGE

  const folderName = folder ? decodeURIComponent(String(folder)) : ''
  const { data: folderList } = await getInitialFolderList()

  const selectedFolder = folderList?.find(f => f.folderName === folderName)

  const initialFileData = await getInitialFileList({
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
    folderId: selectedFolder?.folderId,
    isActive: true
  })

  return (
    <div>
      <Header
        title={folderName}
        buttons={[
          {
            label: '폴더 생성'
          },
          {
            label: '파일 업로드'
          }
        ]}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="w-full flex flex-col p-8 gap-4 ">
        <FolderSection folderList={(folderList && folderList) ?? []} />

        <FileSection
          folderId={selectedFolder!.folderId}
          mode="archive"
          initialFileData={initialFileData && initialFileData}
          initialPage={currentPage}
        />
      </div>
    </div>
  )
}
