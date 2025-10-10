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
  searchParams: Promise<{ page: string; folderId?: string }>
}) {
  const folders = await getInitialFolderList()
  const { page, folderId } = await searchParams

  if (!folders || folders.length === 0) {
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
          <div className="text-center py-20 text-gray-500">
            폴더를 먼저 생성해주세요.
          </div>
        </div>
      </div>
    )
  }

  const selectedFolderId = folderId || folders[0]?.folderId.toString()

  const news = await requireAuth(token =>
    fetchRecommendedNews(selectedFolderId, {
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

        <div className="py-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            분석된 관심 폴더
          </h2>
          <div className="flex gap-2">
            {folders.map(folder => (
              <a
                key={folder.folderId}
                href={`/news/recommend?folderId=${folder.folderId}`}
                className={`px-4 py-2 rounded-md ${
                  selectedFolderId === folder.folderId.toString()
                    ? 'bg-green-normal text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                {folder.folderName === 'default'
                  ? '기본 폴더'
                  : folder.folderName}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6">
          {news?.data?.items && news?.data?.items?.length > 0 ? (
            <NewsGrid
              news={news.data.items}
              page={currentPage}
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
