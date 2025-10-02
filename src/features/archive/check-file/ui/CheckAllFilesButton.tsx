interface Props {
  onAllCheck: () => void
}

function CheckAllFilesButton({ onAllCheck }: Props) {
  return (
    <button
      type="button"
      onClick={onAllCheck}
      className=" text-center px-3 text-gray-dark text-lg hover:bg-orange-accent hover:text-white border-r-2">
      전체 선택
    </button>
  )
}
export default CheckAllFilesButton
