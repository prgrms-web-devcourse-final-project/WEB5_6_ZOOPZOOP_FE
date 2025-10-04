import Image from 'next/image'

interface Props {
  imageUrl: string
  title: string
}

const FileThumbnail = ({ imageUrl, title }: Props) => {
  return (
    <Image
      className="aspect-video rounded-sm"
      src={imageUrl ? imageUrl : '/image.png'}
      alt={imageUrl ? `${title} 썸네일` : '기본 이미지'}
      width={250}
      height={108}
    />
  )
}
export default FileThumbnail
