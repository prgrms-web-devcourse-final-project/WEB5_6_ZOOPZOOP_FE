'use client'

import { CategoryFilter, SearchInput } from '@/features/news'
import { useRouter } from 'next/navigation'

export const NewsHeader = () => {
  const router = useRouter()
  return (
    <div className="w-full h-18 py-4 px-8 bg-gray-dark-active text-white flex items-center justify-between">
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => {
          router.push('/news')
        }}>
        ZOOPS TODAY
      </h2>
      <CategoryFilter />
      <SearchInput />
    </div>
  )
}
