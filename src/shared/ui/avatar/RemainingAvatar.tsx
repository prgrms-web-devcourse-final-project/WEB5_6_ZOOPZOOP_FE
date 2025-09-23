import { Avatar as AvatarContainer, AvatarFallback } from '../shadcn/avatar'

interface Props {
  count: number
}
const RemainingAvatar = ({ count }: Props) => {
  return (
    <AvatarContainer className="border-2 border-white">
      <AvatarFallback className="text-sm bg-orange-accent text-white">
        +{count}
      </AvatarFallback>
    </AvatarContainer>
  )
}
export default RemainingAvatar
