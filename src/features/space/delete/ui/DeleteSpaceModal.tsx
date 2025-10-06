'use client'

import { ModalLayout } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import { useDeleteSpace } from '../model/useDeleteSpace'

interface Props {
  spaceId: number
  title: string
}

const DeleteSpaceModal = ({ spaceId, title }: Props) => {
  const { isDeleting, onDelete, confirmText, setConfirmText, isDeleteEnabled } =
    useDeleteSpace()

  const handleDelete = () => {
    onDelete(spaceId)
  }

  return (
    <ModalLayout size="sm">
      <div className="relative bg-white rounded-lg max-w-sm w-full mx-4 p-2">
        <h3 className="text-xl font-medium text-gray-900 mb-0.5">
          스페이스 영구 삭제
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            <span className="font-medium text-red-600">
              &quot;{title}&quot;
            </span>
            를 입력하세요.
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
            placeholder="삭제"
            className="w-full px-3 py-2 border rounded-md focus-visible:border-red-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting || !isDeleteEnabled(title)}
            type="button"
            className="flex-center gap-2 w-full py-2 text-white bg-red-600 rounded-md disabled-hover:bg-red-700 disabled:opacity-50 cursor-pointer">
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin size-5" />
                삭제 중...
              </>
            ) : (
              '삭제'
            )}
          </button>
        </div>
      </div>
    </ModalLayout>
  )
}
export default DeleteSpaceModal
