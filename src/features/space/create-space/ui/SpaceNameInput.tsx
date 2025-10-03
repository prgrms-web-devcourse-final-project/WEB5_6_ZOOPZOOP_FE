import { RefObject } from 'react'

export const InputSpaceName = ({
  inputRef,
  onCreate
}: {
  onCreate: () => void
  inputRef: RefObject<HTMLInputElement | null>
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="space-name"
          className="text-base font-bold">
          스페이스 이름
        </label>
        <input
          ref={inputRef}
          type="text"
          id="space-name"
          className="border border-gray-normal rounded-md py-3 px-3 text-base"
          placeholder="스페이스 이름을 입력해 주세요"
        />
      </div>
      <button
        className="bg-green-normal w-full text-white rounded-md py-3 px-3 text-base"
        onClick={onCreate}>
        다음
      </button>
    </div>
  )
}
