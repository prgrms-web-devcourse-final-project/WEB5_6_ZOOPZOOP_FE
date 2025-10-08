// HoveredCard.tsx
import { Checkbox } from '@/shared/ui'
import Link from 'next/link'
import { tw } from '@/shared/lib'

interface Props {
  id: number
  mode: 'archive' | 'trash'
  summary: string
  sourceUrl: string
  tags: string[]
  isHover: boolean
  isSelected: boolean
  onSelect: (cardId: number) => void
}

export function HoveredCard({
  id,
  mode,
  summary,
  sourceUrl,
  tags,
  isHover,
  isSelected,
  onSelect
}: Props) {
  return (
    <div
      style={{ height: '100%' }}
      className={tw(
        'absolute top-0 left-0 w-full z-20 transition-all duration-300 ease-in-out',
        isHover
          ? 'opacity-100 scale-105 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none'
      )}>
      <div className="flex flex-col w-full min-h-full bg-white rounded-sm shadow-2xl p-4 text-gray-darker text-base ">
        {mode === 'trash' && (
          <Checkbox
            checked={isSelected}
            onClick={() => onSelect(id)}
          />
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <p
              key={index}
              className="text-base text-green-normal">
              #{tag}
            </p>
          ))}
        </div>

        <div className="flex-1 mb-2">
          <p className="text-base text-black">{summary}</p>
        </div>

        <Link href={sourceUrl}>
          <button className="text-center text-base underline underline-offset-1 py-1 cursor-pointer hover:text-green-normal">
            자세히 보기
          </button>
        </Link>
      </div>
    </div>
  )
}
