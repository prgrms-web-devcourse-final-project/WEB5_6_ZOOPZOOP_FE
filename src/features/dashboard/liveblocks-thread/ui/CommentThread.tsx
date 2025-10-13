'use client'

import { useThreads } from '@liveblocks/react/suspense'
import { LuMessageCircle } from 'react-icons/lu'

interface CommentThreadProps {
  threadId: string
  onToggle: () => void
}

export const CommentThread = ({ threadId, onToggle }: CommentThreadProps) => {
  const { threads } = useThreads()
  const thread = threads.find(t => t.id === threadId)
  if (!thread) return null

  const isResolved = thread.metadata.resolved

  return (
    <button
      onClick={onToggle}
      className={`
        absolute -translate-x-1/2 -translate-y-1/2 left-0 top-0
        flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg transition-all hover:scale-110
        ${isResolved ? 'bg-green-100 border-green-500 text-green-600' : 'bg-white border-blue-500 text-blue-600'}
      `}>
      <LuMessageCircle className="w-4 h-4" />
    </button>
  )
}
