import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NavItems from './NavItems'
import { navItems } from '@/shared/lib/navigation'

const meta = {
  title: 'Navigation/NavItems',
  component: NavItems,
  tags: ['autodocs'],
  argTypes: {
    item: { control: 'object' }
  }
} satisfies Meta<typeof NavItems>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (아카이브 메뉴)
export const Archive: Story = {
  args: {
    item: navItems[0] // 아카이브
  }
}

// 스페이스 메뉴
export const Space: Story = {
  args: {
    item: navItems[1] // 스페이스
  }
}

// 뉴스 메뉴 (children 없음)
export const News: Story = {
  args: {
    item: navItems[2] // 뉴스
  }
}
