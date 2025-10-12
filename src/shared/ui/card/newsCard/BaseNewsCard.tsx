'use client'

import Image from 'next/image'
import { Badge } from '../../badge'
import dayjs from 'dayjs'
import { Handle, Position } from '@xyflow/react'
import { BookmarkPlus, Loader2 } from 'lucide-react'

interface Props {
  title: string
  content: string
  imageUrl?: string
  category?: string
  link?: string
  createdAt: string
  type: 'base' | 'flow'
  user?: {
    name: string
    profileUrl: string
  }
  selected?: boolean
  onSave?: () => void
  loading?: boolean
}

export const BaseNewsCard = ({
  title,
  content,
  imageUrl,
  category,
  link,
  createdAt,
  type,
  user,
  selected,
  onSave,
  loading
}: Props) => {
  return (
    <div
      className={`group w-[320px] h-[371px] rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-200 relative ${
        selected ? 'ring-2 ring-green-normal ring-offset-2' : ''
      }`}>
      <div className="relative">
        {type === 'base' && (
          <button
            onClick={e => {
              if (loading) return
              e.stopPropagation()
              onSave?.()
            }}
            className="absolute top-2 right-2 z-2 w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:bg-green-normal hover:text-white transition-all cursor-pointer">
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
          className={`w-full h-[200px] rounded-t-lg overflow-hidden relative`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="news"
              width={360}
              height={200}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              onError={e => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">이미지 없음</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge name={category || ''} />
          <p className="text-xs text-gray-normal">
            {dayjs(createdAt).format('YYYY.MM.DD. HH:mm') ||
              '2025.01.01. 00:00'}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3
            className="text-lg font-bold line-clamp-1 leading-tight cursor-pointer hover:text-green-normal transition-colors"
            onClick={() => {
              if (!link) return
              window.open(link, '_blank', 'noopener,noreferrer')
            }}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3">{content}</p>
        </div>

        {/* flow 타입일 때만 유저 정보 표시 */}
        {type === 'flow' && user && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Image
              src={user.profileUrl}
              alt={user.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <p className="text-xs text-gray-normal">{user.name}</p>
          </div>
        )}
      </div>

      {type === 'flow' && (
        <>
          <Handle
            type="source"
            position={Position.Top}
            id="top"
            className="!w-5 !h-5 !rounded-full !border-2 !border-white !bg-green-normal transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="!w-5 !h-5 !rounded-full !border-2 !border-white !bg-green-normal transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
          />
          <Handle
            type="source"
            position={Position.Left}
            id="left"
            className="!w-5 !h-5 !rounded-full !border-2 !border-white !bg-green-normal transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
          />
          <Handle
            type="source"
            position={Position.Right}
            id="right"
            className="!w-5 !h-5 !rounded-full !border-2 !border-white !bg-green-normal transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
          />

          <Handle
            type="target"
            position={Position.Top}
            id="top-target"
            className="opacity-0"
          />
          <Handle
            type="target"
            position={Position.Bottom}
            id="bottom-target"
            className="opacity-0"
          />
          <Handle
            type="target"
            position={Position.Left}
            id="left-target"
            className="opacity-0"
          />
          <Handle
            type="target"
            position={Position.Right}
            id="right-target"
            className="opacity-0"
          />
        </>
      )}
    </div>
  )
}
