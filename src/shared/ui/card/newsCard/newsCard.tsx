import Image from 'next/image'
import { Badge } from '../../badge'

interface Props {
  title: string
  content: string
  imageUrl: string
  category: string
  createdAt: string
}

export const NewsCard = ({
  title,
  content,
  imageUrl,
  category,
  createdAt
}: Props) => {
  return (
    <div className="w-[320px] h-[371px] rounded-lg shadow-md bg-white">
      <Image
        src={imageUrl}
        alt="news"
        width={360}
        height={200}
        className="object-cover aspect-video"
      />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge name={category} />
          <p className="text-xs text-gray-normal">
            {createdAt || '2025.01.01'}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-3">{content}</p>
        </div>
      </div>
    </div>
  )
}
