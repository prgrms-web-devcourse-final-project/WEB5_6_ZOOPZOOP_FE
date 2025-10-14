import { getInitialSpaceFileList } from '@/entities/shared-archive/api/file.ssr'
import { SpaceFileSection } from '@/widgets/shared-archive/file-section'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일을 관리하는 휴지통 페이지'
}

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page: string; sort: string }>
}

const INITIAL_PAGE = 1

async function SpaceTrashPage({ searchParams, params }: Props) {
  const search = await searchParams
  const param = await params

  const currentPage = Number(search?.page) || INITIAL_PAGE
  const currentSort = search?.sort
  const spaceId = Number(param.id)

  const initialFileData = await getInitialSpaceFileList({
    page: currentPage,
    spaceId: spaceId,
    isActive: false,
    sort: currentSort
  })

  return (
    <div>
      <div className="w-full flex flex-col p-8 gap-4 ">
        <SpaceFileSection
          currentSort={currentSort}
          spaceId={currentPage}
          mode="trash"
          initialFileData={initialFileData && initialFileData}
          initialPage={INITIAL_PAGE}
        />
      </div>
    </div>
  )
}
export default SpaceTrashPage
