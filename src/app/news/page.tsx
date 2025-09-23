import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스',
  description: '뉴스'
}

export default async function News({
  searchParams
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams
  return <div>News {search}</div>
}
