'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NavItems from './NavItems'
import { ChartNetwork, LayoutGrid, TextSearch } from 'lucide-react'
import { MainNav } from '@/shared/routes'

const mockNav: MainNav = {
  href: '/space',
  label: '스페이스',
  icon: LayoutGrid,
  count: 50,
  children: [
    { href: '/space', label: '차트 보기', icon: ChartNetwork },
    { href: '/space', label: '자세히 보기', icon: TextSearch }
  ]
}

const meta: Meta<typeof NavItems> = {
  title: 'Components/Navigation/NavItems',
  component: NavItems,
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof NavItems>

// Wrapper: 내부 상태 + Controls 동기화
const Wrapper = ({
  item,
  pathName,
  isDashboard
}: {
  item: MainNav
  pathName: string
  isDashboard: boolean
}) => {
  return (
    <div className="w-64 border border-gray-200 p-4">
      <NavItems
        pathName={pathName}
        isDashboard={isDashboard}
        item={item}
        isExpanded={true}
      />
    </div>
  )
}

// --- 스토리 케이스 ---
export const Closed: Story = {
  render: () => (
    <Wrapper
      item={mockNav}
      pathName="/archive"
      isDashboard={true}
    />
  ),
  name: '메뉴 닫힘'
}

export const MainOpen: Story = {
  render: () => (
    <Wrapper
      item={mockNav}
      pathName="/space"
      isDashboard={false}
    />
  ),
  name: '메인 메뉴 열림'
}

export const SubOpen: Story = {
  render: () => (
    <Wrapper
      item={mockNav}
      pathName="/space" /* or 정확한 child href */
      isDashboard={false}
    />
  ),
  name: '서브 메뉴 열림'
}
