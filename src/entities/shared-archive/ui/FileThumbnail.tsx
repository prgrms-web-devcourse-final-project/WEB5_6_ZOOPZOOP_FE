import Image from 'next/image'

interface Props {
  imageUrl: string
  title: string
}

const FileThumbnail = ({ imageUrl, title }: Props) => {
  return (
    <Image
      className="w-full h-[200px] rounded-t-lg overflow-hidden"
      src={
        imageUrl
          ? imageUrl
          : 'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/big-logo'
      }
      alt={imageUrl ? `${title} 썸네일` : '기본 이미지'}
      width={250}
      height={108}
    />
  )
}
export default FileThumbnail
