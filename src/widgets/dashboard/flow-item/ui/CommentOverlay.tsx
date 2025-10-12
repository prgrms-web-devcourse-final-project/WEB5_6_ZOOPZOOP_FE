'use client'

import { useCallback, type RefObject } from 'react'
import { useReactFlow, useViewport } from '@xyflow/react'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors
} from '@dnd-kit/core'

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
  const { flowToScreenPosition, screenToFlowPosition } = useReactFlow()
  useViewport()
  const {
    threads,
    createComment,
    deleteComment,
    toggleResolved,
    updateThreadPosition
  } = useComment()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 75, tolerance: 5 }
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const id = String(event.active.id)
      const t = threads.find(th => th.id === id)
      if (!t) return
      const startScreen = flowToScreenPosition({
        x: t.metadata.x,
        y: t.metadata.y
      })
      const nextScreen = {
        x: startScreen.x + event.delta.x,
        y: startScreen.y + event.delta.y
      }
      const nextFlow = screenToFlowPosition(nextScreen)
      updateThreadPosition(id, nextFlow.x, nextFlow.y)
    },
    [threads, flowToScreenPosition, screenToFlowPosition, updateThreadPosition]
  )

  const DraggableComment = ({
    id,
    children
  }: {
    id: string
    children: React.ReactNode
  }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id })
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ touchAction: 'none' }}>
        {children}
      </div>
    )
  }

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
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}>
      {threads.map(thread => {
        const screenPosition = flowToScreenPosition({
          x: thread.metadata.x,
          y: thread.metadata.y
        })
        const bounds = containerRef.current?.getBoundingClientRect()
        const x = bounds ? screenPosition.x - bounds.left : screenPosition.x
        const y = bounds ? screenPosition.y - bounds.top : screenPosition.y

        return (
          <DraggableComment
            key={thread.id}
            id={thread.id}>
            <CommentThread
              threadId={thread.id}
              x={x}
              y={y}
              onResolve={toggleResolved}
              onDelete={handleDeleteComment}
            />
          </DraggableComment>
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
    </DndContext>
  )
}
