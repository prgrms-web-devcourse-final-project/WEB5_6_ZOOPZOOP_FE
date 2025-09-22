export const InputSpaceName = ({
  setStep
}: {
  setStep: (step: number) => void
}) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="space-name"
          className="text-base font-bold">
          스페이스 이름
        </label>
        <input
          type="text"
          id="space-name"
          className="border border-gray-light rounded-md py-3 px-3 text-base"
          placeholder="스페이스 이름을 입력해 주세요"
        />
      </div>
      <button
        className="bg-green-normal w-full text-white rounded-md py-3 px-3 text-base"
        onClick={() => setStep(2)}>
        다음
      </button>
    </div>
  )
}
