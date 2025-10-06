import { RefObject } from 'react'

interface Props {
  onCreate: () => void
  inputRef: RefObject<HTMLInputElement | null>
  isCreating: boolean
}

export const InputSpaceName = ({ inputRef, onCreate, isCreating }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="space-name"
          className="text-base font-semibold text-gray-700">
          스페이스 이름
        </label>
        <input
          ref={inputRef}
          type="text"
          id="space-name"
          className="border border-gray-300 rounded-lg py-3 px-4 text-base 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     transition-all duration-200
                     placeholder:text-gray-400
                     disabled:bg-gray-50 disabled:cursor-not-allowed"
          placeholder="스페이스 이름을 입력해 주세요"
          disabled={isCreating}
        />
      </div>
      <button
        className="bg-green-normal w-full text-white rounded-lg py-3 px-4 text-base font-medium
                   hover:bg-green-600 active:bg-green-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200
                   flex items-center justify-center gap-2"
        onClick={onCreate}
        disabled={isCreating}>
        {isCreating ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            생성 중...
          </>
        ) : (
          '다음'
        )}
      </button>
    </div>
  )
}
