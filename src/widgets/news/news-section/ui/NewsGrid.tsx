'use client'

import { postArchiveFileClient } from '@/entities/archive/file'
import { useGetArchiveFoldersQuery } from '@/entities/archive/folder'
import { News } from '@/entities/news'
import { BaseNewsCard } from '@/shared/ui/card'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useState } from 'react'
import { RecommendFolder } from '../../recommend-folder'

interface Props {
  news: News[]
  page: number
  type?: 'recommend' | 'base'
}
export const NewsGrid = ({ news, page, type = 'base' }: Props) => {
  const { foldersQuery } = useGetArchiveFoldersQuery()
  const folderList = foldersQuery.data?.data
  const [loading, setLoading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<number | null>(
    folderList?.[0]?.folderId ?? null
  )

  if (!folderList) return null

  const handlePost = async (newUrl: string) => {
    try {
      setLoading(true)
      await postArchiveFileClient(selectedFolder, newUrl)
      showSuccessToast('파일 업로드 성공')
    } catch {
      showErrorToast('파일 업로드 중 오류 발생')
    } finally {
      setLoading(false)
    }
  }

  const limitedNews = news.slice((page - 1) * 18, page * 18)
  return (
    <div>
      {folderList && type === 'recommend' && (
        <div className="py-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            분석된 관심 폴더
          </h2>
          <RecommendFolder
            folderList={folderList}
            onFolderSelect={setSelectedFolder}
          />
        </div>
      )}
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
    </div>
  )
}
