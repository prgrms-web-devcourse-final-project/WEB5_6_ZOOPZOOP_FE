import { tw } from '@/shared/lib'
import { Checkbox } from '@/shared/ui'
import Link from 'next/link'

interface Props {
  id: number
  isHover: boolean
  isSelected: boolean
  title: string
  summary: string
  sourceUrl: string
  tags: string[]
  onSelect: (cardId: number) => void
}

function HoveredCard({
  id,
  isSelected,
  isHover,
  title,
  summary,
  sourceUrl,
  tags,
  onSelect
}: Props) {
  return (
    <div
      className={tw(
        'absolute inset-0 z-20 transform transition-all duration-200 ease-in-out',
        isHover
          ? 'opacity-100 scale-105 -translate-x-5 -translate-y-2'
          : 'opacity-0 scale-95 pointer-events-none'
      )}>
      <div className="flex-1 flex flex-col w-75 min-h-75  bg-white rounded-md shadow-sm p-4 ring-3 ring-green-normal text-gray-darker text-base ">
        <Checkbox
          className="text-orange-accent size-5 mb-3"
          checked={isSelected}
          onCheckedChange={() => onSelect(id)}
          aria-label={`${title} 자료 선택`}
          id={`checkbox-${id}`}
        />
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((item, index) => (
            <p
              className="text-base  text-gray-darker"
              key={index}>
              # {item}
            </p>
          ))}
        </div>

        <div className="flex-1 mb-2 ">
          <p className="text-lg text-black">{summary}</p>
        </div>

        <Link href={sourceUrl}>
          <button
            type="button"
            className="text-center text-base underline underline-offset-1 py-1 cursor-pointer hover:text-green-normal">
            자세히 보기
          </button>
        </Link>
      </div>
    </div>
  )
}
export default HoveredCard
