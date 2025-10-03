import Image from 'next/image'

interface Props {
  imageUrl: string
  title: string
}

const SpaceCardThumbnail = ({ imageUrl, title }: Props) => {
  return (
    <Image
      src={
        imageUrl ||
        'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/default_space_image'
      }
      alt={`${title} 의 썸네일`}
      className="aspect-video rounded-t-lg w-full"
      width={250}
      height={100}
    />
  )
}
export default SpaceCardThumbnail
