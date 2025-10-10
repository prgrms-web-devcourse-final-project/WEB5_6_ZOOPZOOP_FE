import { fetchDashboardFolderServer } from '@/entities/dashboard'
import { fetchSpaceRecommendedNews } from '@/entities/news/api/news.server'
import { requireAuth } from '@/shared/lib/api-route'
import Pagination from '@/shared/ui/pagination/Pagination'
import { NewsGrid } from '@/widgets/news'

export default async function SpaceNews({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: Promise<{ page?: string }>
}) {
  const { id } = params
  const { page } = await searchParams

  const folderList = await requireAuth(token =>
    fetchDashboardFolderServer(id, { token })
  )

  const defaultFolderId =
    folderList.data
      ?.find(folder => folder.folderName === 'default')
      ?.folderId.toString() || ''

  const news = await requireAuth(token =>
    fetchSpaceRecommendedNews(
      {
        spaceId: id,
        folderId: defaultFolderId
      },
      {
        token,
        next: { revalidate: 300 }
      }
    )
  )

  const currentPage = Number(page) || 1

  return (
    <div className="w-[1200px] mx-auto flex flex-col p-10 min-h-[calc(100vh-72px)] bg-white">
      <div className="flex-1 flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-900">AI 추천 뉴스</h1>
          <div className="w-12 h-1 bg-gray-800 mt-2 mb-1"></div>
          <p className="text-sm text-gray-600 mt-2">
            스페이스 활동을 기반으로 관심사에 맞는 뉴스를 추천합니다
          </p>
        </div>

        <div className="pt-6">
          {news?.data?.items && news?.data?.items?.length > 0 ? (
            <NewsGrid
              news={news.data.items}
              page={currentPage}
              type="sub"
              spaceId={id}
            />
          ) : (
            <div className="text-center py-20 text-gray-500">
              추천할 뉴스가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Pagination
          totalPages={news?.data?.total ? Math.ceil(news.data.total / 18) : 1}
        />
      </div>
    </div>
  )
}
