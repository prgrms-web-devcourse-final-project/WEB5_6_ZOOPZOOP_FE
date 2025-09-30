import { MoreVertical } from 'lucide-react'
interface Props {
  id: number
  isClicked: boolean
  onClick: (id: number) => void
}

function ToggleButton({ id, isClicked, onClick }: Props) {
  return (
    <>
      <button
        type="button"
        className="text-gray-dark"
        onClick={e => {
          e.preventDefault()
          onClick(id)
        }}>
        <MoreVertical />
      </button>
      {isClicked && (
        <ul className="absolute left-60 shadow-lg bg-white border-1 rounded-sm z-10">
          <li>
            <button
              type="button"
              className="rounded-t-sm  px-4 py-2 hover:bg-orange-accent">
              수정하기
            </button>
          </li>
          <li>
            <button
              type="button"
              className=" rounded-b-sm px-4 py-2 hover:bg-orange-accent ">
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </>
  )
}
export default ToggleButton
