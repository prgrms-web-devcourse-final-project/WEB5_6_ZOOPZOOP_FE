import Image from 'next/image'

interface Props {
  title: string
  content: string
  imageUrl: string
}

export const NewsCard = ({ title, content, imageUrl }: Props) => {
  return (
    <div className="w-[360px] h-[371px] rounded-lg shadow-md bg-white">
      <Image
        src={imageUrl}
        alt="news"
        width={360}
        height={200}
        className="object-cover aspect-video"
      />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-normal">태그</p>
          <p className="text-xs text-gray-normal">시간</p>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
    </div>
  )
}
