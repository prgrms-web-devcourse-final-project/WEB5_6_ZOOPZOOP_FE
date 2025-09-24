import { delay } from '@/shared/lib'

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return { title: `뉴스 - ${category}` }
}

export default async function NewsCategory() {
  await delay(1000)

  return <div>NewsCategory</div>
}
