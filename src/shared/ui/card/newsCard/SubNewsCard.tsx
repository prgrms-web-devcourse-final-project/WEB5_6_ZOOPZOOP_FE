'use client'

import Image from 'next/image'
import { Badge } from '../../badge'
import dayjs from 'dayjs'
import { BookmarkPlus, Loader2 } from 'lucide-react'

interface Props {
  title: string
  content: string
  imageUrl?: string
  category?: string
  link?: string
  createdAt: string
  onSave?: () => void
  type: 'base' | 'flow'
  loading?: boolean
}

export const SubNewsCard = ({
  title,
  content,
  imageUrl,
  category,
  link,
  createdAt,
  onSave,
  type,
  loading
}: Props) => {
  return (
    <div className="w-full h-[120px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 relative">
      <div className="flex gap-5 h-full">
        {type === 'base' && (
          <button
            onClick={e => {
              if (loading) return
              e.stopPropagation()
              onSave?.()
            }}
            className="absolute top-1 left-1 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:bg-green-normal hover:text-white transition-all">
            {loading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <BookmarkPlus size={16} />
            )}
          </button>
        )}
        <div
          className="w-21 h-21 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden"
          onClick={() => {
            if (!link) return
            window.open(link, '_blank', 'noopener,noreferrer')
          }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="news"
              width={84}
              height={84}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              onError={e => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-xs text-gray-500">이미지</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <div className="flex items-center gap-2">
            {category && <Badge name={category} />}
            <p className="text-xs text-gray-normal absolute right-2.5 top-2.5">
              {dayjs(createdAt).isValid()
                ? dayjs(createdAt).format('MM.DD HH:mm')
                : '발행일 정보 없음'}
            </p>
          </div>
          <div>
            <h4
              className="text-sm font-semibold line-clamp-2 leading-tight cursor-pointer hover:text-green-normal transition-colors mb-1"
              onClick={() => {
                if (!link) return
                window.open(link, '_blank', 'noopener,noreferrer')
              }}>
              {title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
