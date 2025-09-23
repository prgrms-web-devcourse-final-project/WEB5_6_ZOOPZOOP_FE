import Image from 'next/image'

interface Props {
  imageUrl: string
  title: string
}

const SpaceCardThumbnail = ({ imageUrl, title }: Props) => {
  return (
    <Image
      src={imageUrl}
      alt={`${title} 의 썸네일`}
      className="aspect-video rounded-xs"
      width={350}
      height={100}
    />
  )
}
export default SpaceCardThumbnail
