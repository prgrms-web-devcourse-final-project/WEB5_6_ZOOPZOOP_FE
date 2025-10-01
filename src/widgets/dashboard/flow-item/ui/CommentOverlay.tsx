'use client'

import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'
import { CommentThread, NewCommentForm } from '../../../../features/dashboard'
import { useComment } from '../model/useComment'

interface CommentOverlayProps {
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  newCommentPosition: { x: number; y: number } | null
  setNewCommentPosition: (value: { x: number; y: number } | null) => void
}

export const CommentOverlay = ({
  isCreating,
  setIsCreating,
  newCommentPosition,
  setNewCommentPosition
}: CommentOverlayProps) => {
  const { flowToScreenPosition } = useReactFlow()
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

        return (
          <CommentThread
            key={thread.id}
            threadId={thread.id}
            x={screenPosition.x}
            y={screenPosition.y}
            onResolve={toggleResolved}
            onDelete={handleDeleteComment}
          />
        )
      })}

      {isCreating && newCommentPosition && (
        <NewCommentForm
          x={flowToScreenPosition(newCommentPosition).x}
          y={flowToScreenPosition(newCommentPosition).y}
          onSubmit={handleCreateComment}
          onCancel={handleCancelComment}
        />
      )}
    </>
  )
}
