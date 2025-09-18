import { tw } from '@/shared/lib'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'neutral'
  disabled?: boolean
}

export const Example = ({
  children,
  variant = 'primary',
  disabled = false
}: ButtonProps) => {
  return (
    <button
      className={tw(
        'px-5 py-3 rounded-md',
        variant === 'primary' && 'bg-green-normal text-white',
        variant === 'neutral' &&
          'bg-white text-black border border-grey-normal',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}>
      {children}
    </button>
  )
}
