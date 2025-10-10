import { getInitialFolderList } from '@/entities/archive/folder/api/folder.ssr'
import { fetchRecommendedNews } from '@/entities/news'
import { requireAuth } from '@/shared/lib/api-route'
import Pagination from '@/shared/ui/pagination/Pagination'

import { NewsGrid } from '@/widgets/news'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '추천 뉴스',
  description: '추천 뉴스'
}

export default async function Recommend({
  searchParams
}: {
  searchParams: Promise<{ page: string }>
}) {
  const { data } = await getInitialFolderList()

  const { page } = await searchParams

  if (!data) return null

  // 나중에 아카이브 합치면서 수정해야함
  const recommendedNews = await requireAuth(token =>
    fetchRecommendedNews(data[2].folderId.toString(), {
      token,
      next: { revalidate: 300 }
    })
  )
  const currentPage = Number(page) || 1

  return (
    <div className="w-full flex flex-col p-10 min-h-[calc(100vh-72px)] bg-white">
      <div className="flex-1 flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-900">AI 추천 뉴스</h1>
          <div className="w-12 h-1 bg-gray-800 mt-2 mb-1"></div>
          <p className="text-sm text-gray-600 mt-2">
            저장한 폴더를 분석하여 관심사에 맞는 뉴스를 추천합니다
          </p>
        </div>

        <div className="pt-6">
          {recommendedNews &&
          recommendedNews?.data?.items &&
          recommendedNews?.data?.items?.length > 0 ? (
            <NewsGrid
              news={recommendedNews.data.items}
              page={currentPage}
              type="recommend"
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
          totalPages={
            recommendedNews?.data?.total
              ? Math.ceil(recommendedNews.data.total / 18)
              : 1
          }
        />
      </div>
    </div>
  )
}
