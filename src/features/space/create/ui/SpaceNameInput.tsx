import { Loader2 } from 'lucide-react'
import { RefObject } from 'react'

interface Props {
  onCreate: (e: React.FormEvent) => void
  inputRef: RefObject<HTMLInputElement | null>
  isCreating: boolean
}

export const InputSpaceName = ({ inputRef, onCreate, isCreating }: Props) => {
  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={onCreate}>
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
        disabled={isCreating}>
        {isCreating ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 text-white" />
            생성 중...
          </>
        ) : (
          '다음'
        )}
      </button>
    </form>
  )
}
