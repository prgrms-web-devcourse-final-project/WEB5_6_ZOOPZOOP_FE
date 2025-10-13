'use client'

import { memo } from 'react'
import { Thread } from '@liveblocks/react-ui'
import { useThreads } from '@liveblocks/react/suspense'
import { createPortal } from 'react-dom'
import { LuMessageCircle, LuCheck, LuX, LuTrash } from 'react-icons/lu'

interface CommentThreadPanelProps {
  threadId: string
  x: number
  y: number
  onResolve: (threadId: string, resolved: boolean) => void
  onDelete: (threadId: string) => void
  onClose: () => void
  placement?: 'top' | 'right'
}

export const CommentThreadPanel = memo(function CommentThreadPanel({
  threadId,
  x,
  y,
  onResolve,
  onDelete,
  onClose,
  placement = 'right'
}: CommentThreadPanelProps) {
  const { threads } = useThreads()
  const thread = threads.find(t => t.id === threadId)
  if (!thread) return null

  const pos =
    placement === 'right'
      ? {
          position: 'fixed' as const,
          left: x + 12,
          top: y,
          transform: 'translateY(-50%)',
          zIndex: 2200
        }
      : {
          position: 'fixed' as const,
          left: x,
          top: y,
          transform: 'translate(-50%, -100%)',
          zIndex: 2200
        }

  return createPortal(
    <div style={pos}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-0 w-80 max-w-sm overflow-hidden">
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
              onClick={() => onResolve(threadId, !thread.metadata.resolved)}
              className={`p-1.5 rounded-md hover:bg-gray-100 transition-colors ${thread.metadata.resolved ? 'text-green-600' : 'text-gray-400'}`}
              title={thread.metadata.resolved ? '해결됨' : '해결하기'}>
              <LuCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors">
              <LuX className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto p-4">
          <Thread thread={thread} />
        </div>
      </div>
    </div>,
    document.body
  )
})
