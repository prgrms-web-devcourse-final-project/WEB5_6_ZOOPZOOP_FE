import { fetchNewsByKeywords } from '@/entities/news'
import { SearchSection } from '@/features/news'
import { requireAuth } from '@/shared/lib/api-route'
import { MajorNews, NewsCategory } from '@/widgets/news'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스',
  description: '뉴스'
}

export default async function News() {
  const categories = [
    { keywords: 'politics', categoryKor: '정치' },
    { keywords: 'economy', categoryKor: '경제' },
    { keywords: 'society', categoryKor: '사회' },
    { keywords: 'it', categoryKor: 'IT' },
    { keywords: 'sports', categoryKor: '스포츠' }
  ]

  const categoryResults = await Promise.allSettled(
    categories.map(category =>
      requireAuth(async token => {
        const response = await fetchNewsByKeywords(category.categoryKor, {
          token,
          next: { revalidate: 300 }
        })
        return { status: 200, msg: 'ok', data: response }
      })
    )
  )

  return (
    <div className="w-full flex flex-col p-10 min-h-[calc(100vh-72px)]">
      <div className="flex-1 flex flex-col gap-8">
        <MajorNews />

        <div className="">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">뉴스 키워드</h2>
          <SearchSection />
        </div>

        <div className="flex flex-col gap-10">
          {categories.map((category, index) => {
            const news =
              categoryResults[index].status === 'fulfilled'
                ? categoryResults[index].value?.data?.data?.items
                : []

            return (
              <NewsCategory
                key={category.keywords}
                category={category.keywords}
                categoryKor={category.categoryKor}
                news={news?.slice(0, 4) ?? []}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
