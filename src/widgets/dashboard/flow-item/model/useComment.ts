'use client'

import { useCallback, useState } from 'react'
import {
  useThreads,
  useCreateThread,
  useEditThreadMetadata,
  useSelf,
  useDeleteThread
} from '@liveblocks/react/suspense'

export const useComment = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  const { threads } = useThreads()
  const createThread = useCreateThread()
  const deleteThread = useDeleteThread()

  const editThreadMetadata = useEditThreadMetadata()
  const user = useSelf()

  // 새 코멘트 생성
  const createComment = useCallback(
    (x: number, y: number, content: string) => {
      if (!user) return

      createThread({
        body: {
          version: 1,
          content: [
            {
              type: 'paragraph',
              children: [{ text: content }]
            }
          ]
        },
        metadata: {
          x,
          y,
          zIndex: 1000,
          resolved: false
        }
      })

      setIsCreating(false)
    },
    [createThread, user]
  )

  const deleteComment = useCallback(
    (threadId: string) => {
      deleteThread(threadId)
    },
    [deleteThread]
  )

  // 코멘트 위치 업데이트
  const updateThreadPosition = useCallback(
    (threadId: string, x: number, y: number) => {
      editThreadMetadata({
        threadId,
        metadata: { x, y }
      })
    },
    [editThreadMetadata]
  )

  // 코멘트 해결 상태 토글
  const toggleResolved = useCallback(
    (threadId: string, resolved: boolean) => {
      editThreadMetadata({
        threadId,
        metadata: { resolved }
      })
    },
    [editThreadMetadata]
  )

  return {
    threads,
    isCreating,
    selectedThreadId,
    setIsCreating,
    setSelectedThreadId,
    createComment,
    updateThreadPosition,
    toggleResolved,
    deleteComment
  }
}
