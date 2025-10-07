'use client'

import { CategoryFilter, SearchInput } from '@/features/news'
import { useRouter, usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react' // 아이콘 라이브러리 사용

export const NewsHeader = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isRecommendPage = pathname === '/news/recommend'

  return (
    <div className="w-full h-18 py-4 px-8 bg-gray-dark-active text-white flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h2
          className="text-xl font-bold cursor-pointer hover:text-green-normal transition-colors"
          onClick={() => router.push('/news')}>
          ZOOP&apos;S TODAY
        </h2>

        <button
          onClick={() => router.push('/news/recommend')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isRecommendPage
              ? 'bg-gradient-to-r from-green-normal to-green-normal-hover text-white shadow-lg'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">AI 추천</span>
        </button>
      </div>

      <CategoryFilter />
      <SearchInput />
    </div>
  )
}
