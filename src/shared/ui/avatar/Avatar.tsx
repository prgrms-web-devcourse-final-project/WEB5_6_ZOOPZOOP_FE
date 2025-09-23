import { Avatar as AvatarContainer, AvatarImage } from '../shadcn/avatar'

interface Props {
  url: string
  alt: string
}
const Avatar = ({ url, alt }: Props) => {
  return (
    <AvatarContainer className="border-2 border-white">
      <AvatarImage
        src={url ? url : 'https://github.com/shadcn.png'}
        alt={alt}
      />
    </AvatarContainer>
  )
}
export default Avatar
