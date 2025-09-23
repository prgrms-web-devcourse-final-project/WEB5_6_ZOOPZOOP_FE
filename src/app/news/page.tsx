import Pagination from '@/shared/ui/pagination/Pagination'
import { NewsGrid } from '@/widgets/news-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스',
  description: '뉴스'
}

export default async function News() {
  //   {
  //   searchParams
  // }: {
  //   searchParams: Promise<{ search?: string }>
  // }
  // const { search } = await searchParams
  // console.log(search)

  return (
    <div className="w-full flex flex-col p-10 min-h-[calc(100vh-72px)]">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">뉴스</h1>
        <NewsGrid />
      </div>
      <div className="flex justify-center mt-6">
        <Pagination totalPages={5} />
      </div>
    </div>
  )
}
