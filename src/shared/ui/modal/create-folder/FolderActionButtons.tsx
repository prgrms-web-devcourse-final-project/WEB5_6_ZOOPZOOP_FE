interface FolderActionButtonsProps {
  onCancel: () => void
  onCreate: () => void
  isCreating?: boolean
  disabled?: boolean
  label: string
}

export const FolderActionButtons = ({
  onCancel,
  onCreate,
  label,
  isCreating = false,
  disabled = false
}: FolderActionButtonsProps) => {
  return (
    <div className="w-full flex gap-2.5">
      <button
        onClick={onCancel}
        disabled={isCreating}
        className="bg-white w-full cursor-pointer text-black border border-gray-normal rounded-md py-3 px-3 text-base disabled:opacity-50 hover:bg-orange-accent">
        취소
      </button>
      <button
        onClick={onCreate}
        disabled={disabled || isCreating}
        className="bg-green-normal w-full cursor-pointer text-white rounded-md py-3 px-3 text-base disabled:opacity-50 hover:bg-orange-accent">
        {isCreating ? `${label} 중...` : label}
      </button>
    </div>
  )
}
