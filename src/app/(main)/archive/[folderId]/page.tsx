import { getInitialFileList } from '@/entities/archive/file/api/file.ssr'
import { getInitialFolderList } from '@/entities/archive/folder/api/folder.ssr'
import { Header } from '@/shared/ui/header'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'

import type { Metadata } from 'next'

interface MetadataProps {
  params: Promise<{ folderId: string }>
  searchParams?: Promise<{ name?: string }>
}
export async function generateMetadata({
  params,
  searchParams
}: MetadataProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const folderName = resolvedSearchParams?.name
    ? decodeURIComponent(resolvedSearchParams.name)
    : '폴더'

  return {
    title: folderName
  }
}

interface Props {
  searchParams: Promise<{ page?: string; name?: string; sort?: string }>
  params: Promise<{ folderId: string }>
}

const INITIAL_PAGE = 1
const DEFAULT_SIZE = 8

export default async function ArchiveFolderPage({
  searchParams,
  params
}: Props) {
  const searchParam = await searchParams
  const { folderId } = await params

  const currentPage = Number(searchParam?.page) || INITIAL_PAGE
  const currentSort = searchParam?.sort

  const folderName = searchParam.name
    ? decodeURIComponent(String(searchParam.name))
    : ''

  const folderList = await getInitialFolderList()

  const selectedFolder = folderList?.find(f => f.folderName === folderName)

  const initialFileData = await getInitialFileList({
    page: currentPage,
    folderId: Number(folderId),
    sort: currentSort,
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
        <FolderSection folderList={folderList ?? []} />

        <FileSection
          size={DEFAULT_SIZE}
          currentSort={currentSort}
          folderId={(selectedFolder && selectedFolder.folderId) ?? 0}
          mode="archive"
          initialFileData={initialFileData}
          initialPage={currentPage}
        />
      </div>
    </div>
  )
}
