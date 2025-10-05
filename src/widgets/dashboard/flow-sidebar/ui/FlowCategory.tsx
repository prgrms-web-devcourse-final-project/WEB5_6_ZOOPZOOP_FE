'use client'

import { tw } from '@/shared/lib'
import { useState } from 'react'

export const FlowCategory = () => {
  const [category, setCategory] = useState('미생성')
  return (
    <div className="flex gap-2">
      {['미생성', '생성'].map(item => (
        <div
          key={item}
          className={tw(
            'px-4 py-2 text-sm rounded-full transition-all cursor-pointer font-medium',
            category === item
              ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          )}
          onClick={() => setCategory(item)}>
          {item}
        </div>
      ))}
    </div>
  )
}
