import { fetchNews } from '@/entities/news'

import { NewsGrid } from '../../news-section'

export const MajorNews = async () => {
  const news = await fetchNews()
  const limitedNews = news?.data?.items?.slice(0, 4) ?? []

  if (limitedNews.length === 0) {
    return null
  }

  const [mainNews, ...subNews] = limitedNews

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">주요 뉴스</h2>

      <NewsGrid
        news={limitedNews}
        page={1}
        type="main"
        mainNews={mainNews}
        subNews={subNews}
      />
    </div>
  )
}
