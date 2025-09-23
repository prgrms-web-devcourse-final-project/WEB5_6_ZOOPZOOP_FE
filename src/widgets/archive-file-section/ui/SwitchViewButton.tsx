import { tw } from '@/shared/lib'
import { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  isSelected: boolean
}

function SwitchViewButton({ icon, isSelected }: Props) {
  const Icon = icon
  return (
    <button
      type="button"
      className={tw(
        'flex gap-2 items-center text-base rounded-sm p-1 hover:bg-gray-light-active cursor-pointer',
        isSelected
          ? 'bg-green-light border-green-light-active text-green-normal'
          : ''
      )}>
      <Icon size={20} />
    </button>
  )
}
export default SwitchViewButton
