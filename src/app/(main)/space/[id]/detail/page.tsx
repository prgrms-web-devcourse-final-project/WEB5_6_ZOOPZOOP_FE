import { getInitialSpaceFileList } from '@/entities/shared-archive/api/file.ssr'
import { SpaceFileSection } from '@/widgets/shared-archive/file-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '자세히 보기',
  description: '스페이스에 있는 자료들을 자세히 보는 페이지'
}

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page: string; sort: string; q: string }>
}

const ROOT_FOLDER_ID = 0
const INITIAL_PAGE = 1

const SpaceDetailPage = async ({ searchParams, params }: Props) => {
  const search = await searchParams
  const param = await params

  const currentPage = Number(search?.page) || INITIAL_PAGE
  const currentSort = search?.sort
  const keyword = search?.q
  const spaceId = Number(param.id)

  const initialFileData = await getInitialSpaceFileList({
    page: currentPage,
    spaceId: spaceId,
    sort: currentSort,
    keyword: keyword
  })

  return (
    <div className="w-full flex flex-col p-8 gap-4 ">
      <SpaceFileSection
        currentSort={currentSort}
        spaceId={ROOT_FOLDER_ID}
        mode="space"
        initialFileData={initialFileData}
        initialPage={currentPage}
      />
    </div>
  )
}
export default SpaceDetailPage
