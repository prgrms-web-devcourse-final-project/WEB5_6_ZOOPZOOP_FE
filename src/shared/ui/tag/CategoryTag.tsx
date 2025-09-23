import { tw } from '@/shared/lib'

interface Props {
  name: string
  color: string
  className?: string
}

const CategoryTag = ({ color, name, className }: Props) => {
  return (
    <span
      className={tw(
        `px-3 py-1 rounded-full font-semibold text-xs ${color}`,
        className
      )}>
      {name}
    </span>
  )
}
export default CategoryTag
