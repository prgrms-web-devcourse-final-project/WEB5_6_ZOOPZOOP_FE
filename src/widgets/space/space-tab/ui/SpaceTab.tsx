'use client'

import { SPACE_STATUS, TabType } from '@/entities/space'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/shadcn/tabs'
import { Check, CircleDashed } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const tabs: TabType[] = [
  {
    value: 'ALL',
    label: 'All'
  },
  {
    value: 'JOINED',
    label: 'Joined',
    icon: <Check className="w-4 h-4" />
  },
  {
    value: 'PENDING',
    label: 'Pending',
    icon: <CircleDashed className="w-4 h-4" />
  }
]

const SpaceTab = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentState = searchParams.get('state') ?? 'ALL'

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === SPACE_STATUS.ALL) {
      params.delete('state')
    } else {
      params.set('state', value)
    }
    return router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Tabs
      className="py-2 pt-3"
      defaultValue={currentState}
      onValueChange={handleTabChange}>
      <TabsList className="h-10 p-1">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.label}
            className="px-3 gap-1 text-sm font-medium data-[state=active]:bg-green-light-active data-[state=active]:text-green-dark-active"
            value={tab.value}>
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
export default SpaceTab
