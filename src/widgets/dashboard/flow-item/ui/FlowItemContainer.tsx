import { LuMessageCircle } from 'react-icons/lu'

interface FlowItemContainerProps {
  isCreating: boolean
  setIsCreating: (value: boolean) => void
}

export const FlowItemContainer = ({
  isCreating,
  setIsCreating
}: FlowItemContainerProps) => {
  const handleCommentClick = () => {
    setIsCreating(!isCreating)
  }

  return (
    <div className="absolute bottom-6 left-6">
      <button
        onClick={handleCommentClick}
        className={`
          flex items-center gap-2 px-4 py-2.5
          bg-white border rounded-full shadow-lg
          transition-all duration-200 hover:scale-105
          ${
            isCreating
              ? 'border-green-normal bg-green-50 shadow-green-200'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
          }
        `}>
        <div
          className={`
            flex-center w-8 h-8 rounded-full transition-colors
            ${isCreating ? 'bg-green-normal' : 'bg-gray-100'}
          `}>
          <LuMessageCircle
            className={`w-5 h-5 ${isCreating ? 'text-white' : 'text-gray-600'}`}
          />
        </div>
        <span
          className={`
            text-sm font-semibold
            ${isCreating ? 'text-green-normal' : 'text-gray-700'}
          `}>
          {isCreating ? '댓글 추가 중...' : '댓글 추가'}
        </span>
      </button>
    </div>
  )
}
