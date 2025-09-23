'use client'

import { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  label: string
  onClick: () => void
}

function ActionButton({ icon, label, onClick }: Props) {
  const Icon = icon

  return (
    <button
      type="button"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
      className="flex items-center gap-1 border-[1.5px] rounded-full bg-white px-4 py-2 text-base text-gray-dark cursor-pointer hover:bg-orange-accent hover:border-orange-accent">
      <Icon size={20} />
      <p className="hidden md:block">{label}</p>
    </button>
  )
}
export default ActionButton
