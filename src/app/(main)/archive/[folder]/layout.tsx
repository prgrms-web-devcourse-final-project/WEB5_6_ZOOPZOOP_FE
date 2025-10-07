import type { Metadata } from 'next'

interface Props {
  params: { folder: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { folder } = await params
  const title = decodeURIComponent(folder)

  return {
    title,
    description: `${folder} 안의 파일들을 볼 수 있는 페이지`
  }
}

export default function ArchiveFolderLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="w-full">{children}</div>
}
