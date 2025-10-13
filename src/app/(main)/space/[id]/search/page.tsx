import { getInitialSpaceFileList } from '@/entities/shared-archive/api/file.ssr'
import { SpaceFileSection } from '@/widgets/shared-archive/file-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '자세히 보기',
  description: '스페이스에 있는 자료들을 자세히 보는 페이지'
}

interface Props {
  params: Promise<{ id: string }>
  pageParams: Promise<{ page: string }>
  searchParams: Promise<{ q?: string }>
}

const ROOT_FOLDER_ID = 0
const INITIAL_PAGE = 1

const SpaceSearchResultPage = async ({
  searchParams,
  pageParams,
  params
}: Props) => {
  const search = await searchParams
  const param = await params
  const page = await pageParams

  const query = search.q
  const currentPage = Number(page?.page) || INITIAL_PAGE
  const spaceId = Number(param.id)

  const initialFileData = await getInitialSpaceFileList({
    page: currentPage,
    spaceId: spaceId,
    isActive: false,
    keyword: query
  })

  return (
    <div className="w-full flex flex-col p-8 gap-4 ">
      <SpaceFileSection
        spaceId={ROOT_FOLDER_ID}
        mode="space"
        initialFileData={initialFileData}
        initialPage={currentPage}
      />
    </div>
  )
}
export default SpaceSearchResultPage
