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
import { CommentThread } from '@/features/dashboard/liveblocks-thread/ui/CommentThread'
import { CommentThreadPanel } from '@/features/dashboard/liveblocks-thread/ui/CommentThreadPanel'
import { NewCommentForm } from '@/features/dashboard'

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
    updateThreadPosition,
    selectedThreadId,
    setSelectedThreadId
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
    x,
    y,
    disabled,
    children
  }: {
    id: string
    x: number
    y: number
    disabled?: boolean
    children: React.ReactNode
  }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({ id })
    const dragBind = disabled ? {} : { ...attributes, ...listeners }

    return (
      <div
        ref={setNodeRef}
        {...dragBind}
        style={{
          position: 'fixed',
          left: x,
          top: y,
          zIndex: isDragging ? 10000 : 2100,
          touchAction: 'none',
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined
        }}>
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
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}>
        {threads.map(thread => {
          const screen = flowToScreenPosition({
            x: thread.metadata.x,
            y: thread.metadata.y
          })
          const x = screen.x
          const y = screen.y
          const isOpen = selectedThreadId === thread.id

          return (
            <DraggableComment
              key={thread.id}
              id={thread.id}
              x={x}
              y={y}
              disabled={isOpen}>
              <CommentThread
                threadId={thread.id}
                onToggle={() => setSelectedThreadId(isOpen ? null : thread.id)}
              />
            </DraggableComment>
          )
        })}
      </DndContext>

      {selectedThreadId &&
        (() => {
          const t = threads.find(th => th.id === selectedThreadId)
          if (!t) return null
          const screen = flowToScreenPosition({
            x: t.metadata.x,
            y: t.metadata.y
          })
          return (
            <CommentThreadPanel
              threadId={t.id}
              x={screen.x}
              y={screen.y}
              onResolve={toggleResolved}
              onDelete={handleDeleteComment}
              onClose={() => setSelectedThreadId(null)}
              placement="right"
            />
          )
        })()}

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
