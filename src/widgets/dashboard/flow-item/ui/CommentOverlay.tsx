'use client'

import { useCallback, type RefObject } from 'react'
import { useReactFlow, useViewport } from '@xyflow/react'

import { useComment } from '../model/useComment'
import { CommentThread, NewCommentForm } from '@/features/dashboard'

interface CommentOverlayProps {
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  newCommentPosition: { x: number; y: number } | null
  setNewCommentPosition: (value: { x: number; y: number } | null) => void
  containerRef: RefObject<HTMLDivElement>
}

export const CommentOverlay = ({
  isCreating,
  setIsCreating,
  newCommentPosition,
  setNewCommentPosition,
  containerRef
}: CommentOverlayProps) => {
  const { flowToScreenPosition } = useReactFlow()
  // 뷰포트(줌/패닝) 변경 시 자동 재렌더
  useViewport()
  const { threads, createComment, deleteComment, toggleResolved } = useComment()

  const handleCreateComment = useCallback(
    (content: string) => {
      if (newCommentPosition) {
        createComment(newCommentPosition.x, newCommentPosition.y, content)
        setNewCommentPosition(null)
        setIsCreating(false)
      }
    },
    [newCommentPosition, createComment, setIsCreating, setNewCommentPosition]
  )

  const handleCancelComment = useCallback(() => {
    setIsCreating(false)
    setNewCommentPosition(null)
  }, [setIsCreating, setNewCommentPosition])

  const handleDeleteComment = useCallback(
    (threadId: string) => {
      deleteComment(threadId)
    },
    [deleteComment]
  )

  return (
    <>
      {threads.map(thread => {
        const screenPosition = flowToScreenPosition({
          x: thread.metadata.x,
          y: thread.metadata.y
        })
        const bounds = containerRef.current?.getBoundingClientRect()
        const x = bounds ? screenPosition.x - bounds.left : screenPosition.x
        const y = bounds ? screenPosition.y - bounds.top : screenPosition.y

        return (
          <CommentThread
            key={thread.id}
            threadId={thread.id}
            x={x}
            y={y}
            onResolve={toggleResolved}
            onDelete={handleDeleteComment}
          />
        )
      })}

      {isCreating &&
        newCommentPosition &&
        (() => {
          const screen = flowToScreenPosition(newCommentPosition)
          const bounds = containerRef.current?.getBoundingClientRect()
          const x = bounds ? screen.x - bounds.left : screen.x
          const y = bounds ? screen.y - bounds.top : screen.y
          return (
            <NewCommentForm
              x={x}
              y={y}
              onSubmit={handleCreateComment}
              onCancel={handleCancelComment}
            />
          )
        })()}
    </>
  )
}
