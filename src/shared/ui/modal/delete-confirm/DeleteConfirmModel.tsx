'use client'

import { ModalLayout } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import { FormEvent } from 'react'

interface ConfirmDeleteModalProps {
  // 모달 상단에 표시될 제목
  title: string
  // 제목 아래 설명 텍스트
  description: string
  // 사용자가 입력해야 하는 확인 문구 (예: "삭제", "계정 영구 삭제")
  confirmKeyword: string
  // 현재 입력된 텍스트
  confirmText: string
  // 입력 텍스트 변경 핸들러
  onConfirmTextChange: (text: string) => void
  // 삭제 버튼 클릭 시 실행될 함수
  onDelete: (e: FormEvent) => void
  // 삭제 버튼 활성화 여부
  isDeleteEnabled: boolean
  // 삭제 진행 중 여부 (로딩 상태)
  isDeleting: boolean

  // 삭제 버튼에 표시할 텍스트 (기본값: "삭제")
  deleteButtonText?: string
  // 삭제 중일 때 버튼에 표시할 텍스트 (기본값: "삭제 중...")
  deletingButtonText?: string
  // 입력 필드의 placeholder
  inputPlaceholder?: string
}

export const DeleteConfirmModel = ({
  title,
  description,
  confirmKeyword,
  confirmText,
  onConfirmTextChange,
  onDelete,
  isDeleteEnabled,
  isDeleting,
  deleteButtonText = '삭제',
  deletingButtonText = '삭제 중...',
  inputPlaceholder = '삭제'
}: ConfirmDeleteModalProps) => {
  return (
    <ModalLayout size="sm">
      <form
        className="relative bg-white rounded-lg max-w-sm w-full mx-4 p-6"
        onSubmit={onDelete}>
        {/* 제목 */}
        <h3 className="text-xl font-medium text-gray-900 mb-0.5">{title}</h3>
        {/* 설명 */}
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        {/* 확인 입력 필드 */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            <span className="font-medium text-red-600">
              &quot;{confirmKeyword}&quot;
            </span>
            를 입력하세요.
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={e => onConfirmTextChange(e.target.value)}
            disabled={isDeleting}
            placeholder={inputPlaceholder}
            className="w-full px-3 py-2 border rounded-md focus-visible:border-red-500"
            autoFocus
          />
        </div>

        <div className={'flex gap-3'}>
          {/* 삭제 버튼 */}
          <button
            disabled={isDeleting || !isDeleteEnabled}
            type="submit"
            className={`flex-center gap-2 py-2 text-white bg-red-600 rounded-md disabled-hover:bg-red-700 disabled:opacity-50 cursor-pointer w-full`}>
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin size-5" />
                {deletingButtonText}
              </>
            ) : (
              deleteButtonText
            )}
          </button>
        </div>
      </form>
    </ModalLayout>
  )
}
