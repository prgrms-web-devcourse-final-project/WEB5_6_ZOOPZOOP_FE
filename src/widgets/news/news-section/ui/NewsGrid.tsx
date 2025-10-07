'use client'

import { postArchiveFileClient } from '@/entities/archive/file'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { News } from '@/entities/news'
import { BaseNewsCard } from '@/shared/ui/card'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useState } from 'react'

interface Props {
  news: News[]
  page: number
}
export const NewsGrid = ({ news, page }: Props) => {
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data
  const [loading, setLoading] = useState(false)

  if (!folderList) return null

  const handlePost = async (newUrl: string) => {
    try {
      setLoading(true)
      await postArchiveFileClient(folderList[0].folderId, newUrl)
      showSuccessToast('파일 업로드 성공')
    } catch {
      showErrorToast('파일 업로드 중 오류 발생')
    } finally {
      setLoading(false)
    }
  }

  const limitedNews = news.slice((page - 1) * 18, page * 18)

  return (
    <div className="flex flex-wrap gap-4">
      {limitedNews.map((item, index) => (
        <BaseNewsCard
          key={item.link || `${item.title}-${index}`}
          title={item.title}
          content={item.description}
          createdAt={item.pubDate}
          link={item.link}
          imageUrl={`/api/og-image?url=${encodeURIComponent(item.link)}`}
          type="base"
          onSave={() => handlePost(item.link)}
          loading={loading}
        />
      ))}
    </div>
  )
}
