import { fetchNewsByKeywords } from '@/entities/news'
import Pagination from '@/shared/ui/pagination/Pagination'

import { NewsGrid } from '@/widgets/news/news-section'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return { title: `뉴스 - ${category}` }
}

const categoryList = {
  politics: '정치',
  economy: '경제',
  society: '사회',
  it: 'IT',
  sports: '스포츠'
}

export default async function NewsCategory({
  params,
  searchParams
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page: string }>
}) {
  const { category } = await params
  const keywords = categoryList[category as keyof typeof categoryList]
  if (!keywords) {
    return notFound()
  }
  const news = await fetchNewsByKeywords(keywords)

  const { page } = await searchParams
  const currentPage = Number(page) || 1

  return (
    <div className="w-full flex flex-col p-10 min-h-[calc(100vh-72px)]">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">뉴스</h1>
        {news && news?.data?.items && news?.data?.items?.length > 0 ? (
          <NewsGrid
            news={news.data?.items ?? []}
            page={currentPage}
            type="sub"
          />
        ) : (
          <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>
      <div className="mt-8">
        <Pagination
          totalPages={news?.data?.total ? Math.ceil(news.data.total / 18) : 1}
        />
      </div>
    </div>
  )
}
