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
    <div className="w-[435px] h-[96px] flex-center gap-10 bg-[#F9FAFB] border border-gray-dark shadow-md rounded-md p-4 absolute bottom-6 right-[50%] translate-x-[50%]">
      <button
        onClick={handleCommentClick}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          isCreating ? 'bg-green-100' : 'hover:bg-gray-100'
        }`}>
        <div
          className={`flex-center w-12.5 h-12.5 bg-white border rounded-full ${
            isCreating ? 'border-green-normal' : 'border-gray-light'
          }`}>
          <LuMessageCircle
            className={`w-6 h-6 ${
              isCreating ? 'text-green-normal' : 'text-gray-normal'
            }`}
          />
        </div>
        <p
          className={`text-sm font-medium ${
            isCreating ? 'text-green-normal' : 'text-gray-dark'
          }`}>
          {isCreating ? '댓글 모드' : '댓글'}
        </p>
      </button>
    </div>
  )
}
