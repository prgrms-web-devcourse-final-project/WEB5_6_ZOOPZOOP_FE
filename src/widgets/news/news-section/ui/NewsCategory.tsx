import { News } from '@/entities/news'

import Link from 'next/link'
import { NewsGrid } from './NewsGrid'

interface Props {
  category: string
  news: News[]
  categoryKor: string
}

export const NewsCategory = async ({ category, news, categoryKor }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{categoryKor}</h2>
        <Link
          href={`/news/${category}`}
          className="text-green-normal hover:text-green-normal-hover font-medium text-sm transition-colors cursor-pointer">
          자세히 보기 →
        </Link>
      </div>

      {news.length > 0 ? (
        <NewsGrid
          news={news}
          page={1}
          type="category"
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          해당 카테고리의 뉴스가 없습니다.
        </div>
      )}
    </div>
  )
}
