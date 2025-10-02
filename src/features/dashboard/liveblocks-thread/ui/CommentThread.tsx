'use client'

import { useState } from 'react'
import { Thread } from '@liveblocks/react-ui'
import { useThreads } from '@liveblocks/react/suspense'

import { LuMessageCircle, LuCheck, LuX, LuTrash } from 'react-icons/lu'

interface CommentThreadProps {
  threadId: string
  x: number
  y: number
  onResolve: (threadId: string, resolved: boolean) => void
  onDelete: (threadId: string) => void
}

export const CommentThread = ({
  threadId,
  x,
  y,
  onResolve,
  onDelete
}: CommentThreadProps) => {
  const { threads } = useThreads()
  const thread = threads.find(t => t.id === threadId)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!thread) return null

  const isResolved = thread.metadata.resolved

  return (
    <div
      className="absolute z-50"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)',
        marginTop: '-8px'
      }}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg transition-all hover:scale-110
            ${
              isResolved
                ? 'bg-green-100 border-green-500 text-green-600'
                : 'bg-white border-green-normal text-green-normal'
            }
          `}>
          <LuMessageCircle className="w-4 h-4" />
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-0 w-80 max-w-sm h-full overflow-hidden">
          {/* 헤더 */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <LuMessageCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                댓글 {thread.comments.length}개
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(threadId)}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors">
                <LuTrash className="w-4 h-4" />
              </button>
              <button
                onClick={() => onResolve(threadId, !isResolved)}
                className={`
                  p-1.5 rounded-md hover:bg-gray-100 transition-colors
                  ${isResolved ? 'text-green-600' : 'text-gray-400'}
                `}
                title={isResolved ? '해결됨' : '해결하기'}>
                <LuCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors">
                <LuX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="max-h-60 overflow-y-auto p-4">
            <Thread thread={thread} />
          </div>
        </div>
      )}
    </div>
  )
}
