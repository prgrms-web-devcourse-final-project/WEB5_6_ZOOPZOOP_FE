import { fetchArchiveFolderServer } from '@/entities/archive/folder/api/folder.server'
import { fetchRecommendedNews } from '@/entities/news'
import { requireAuth } from '@/shared/lib/api-route'

import { NewsGrid } from '@/widgets/news'
import { RecommendFolder } from '@/widgets/news/recommend-folder'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '추천 뉴스',
  description: '추천 뉴스'
}

export default async function Recommend() {
  const { data } = await fetchArchiveFolderServer()

  const recommendedNews = await requireAuth(token =>
    fetchRecommendedNews('24', { token })
  )

  return (
    <div className="w-full flex flex-col p-10 min-h-[calc(100vh-72px)]">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-6">추천 뉴스</h1>

        <RecommendFolder folderList={data ?? []} />

        {recommendedNews &&
        recommendedNews?.data?.items &&
        recommendedNews?.data?.items?.length > 0 ? (
          <NewsGrid news={recommendedNews.data.items} />
        ) : (
          <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  )
}
