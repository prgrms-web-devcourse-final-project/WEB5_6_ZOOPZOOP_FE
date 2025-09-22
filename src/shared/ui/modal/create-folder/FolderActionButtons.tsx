interface FolderActionButtonsProps {
  onCancel: () => void
  onCreate: () => void
  isCreating?: boolean
  disabled?: boolean
}

export const FolderActionButtons = ({
  onCancel,
  onCreate,
  isCreating = false,
  disabled = false
}: FolderActionButtonsProps) => {
  return (
    <div className="w-full flex gap-2.5">
      <button
        onClick={onCancel}
        disabled={isCreating}
        className="bg-white w-full text-black border border-gray-normal rounded-md py-3 px-3 text-base disabled:opacity-50">
        취소
      </button>
      <button
        onClick={onCreate}
        disabled={disabled || isCreating}
        className="bg-green-normal w-full text-white rounded-md py-3 px-3 text-base disabled:opacity-50">
        {isCreating ? '생성 중...' : '생성'}
      </button>
    </div>
  )
}
