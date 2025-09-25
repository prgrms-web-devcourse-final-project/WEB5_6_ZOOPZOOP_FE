import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

interface Props {
  label: string
  direction?: 'asc' | 'desc' | 'none'
  onClick: () => void
}

function SortButton({ label, direction, onClick }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="flex gap-2 items-center text-base rounded-sm p-1  cursor-pointer hover:bg-gray-light-active hover:font-bold">
        <p>{label}</p>
        {direction === 'asc' && <ArrowUp size={14} />}
        {direction === 'desc' && <ArrowDown size={14} />}
        {direction === 'none' && <Minus size={14} />}
      </button>
    </>
  )
}
export default SortButton
