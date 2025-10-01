'use client'

import { useState } from 'react'
import { LuSend, LuX } from 'react-icons/lu'

interface NewCommentFormProps {
  x: number
  y: number
  onSubmit: (content: string) => void
  onCancel: () => void
}

export const NewCommentForm = ({
  x,
  y,
  onSubmit,
  onCancel
}: NewCommentFormProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content.trim())
      setContent('')
    }
  }

  return (
    <div
      className="absolute z-50"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)'
      }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-80">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            새 댓글 작성
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded hover:bg-gray-100 text-gray-400">
            <LuX className="w-4 h-4" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-normal"
          rows={3}
          autoFocus
        />

        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            취소
          </button>
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-3 py-1.5 text-sm bg-green-normal text-white rounded hover:bg-green-normal-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
            <LuSend className="w-3 h-3" />
            작성
          </button>
        </div>
      </form>
    </div>
  )
}
