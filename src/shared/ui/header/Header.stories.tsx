'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Header, { Button } from './Header'
import { LucideIcon, Settings, Plus } from 'lucide-react'

// --- 더미 버튼 예시 ---
const buttons: Button[] = [
  {
    label: '추가',
    icon: Plus as LucideIcon,
    onClick: () => {}
  },
  {
    label: '설정',
    icon: Settings as LucideIcon,
    onClick: () => {}
  }
]

// --- Meta 설정 ---
const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    title: { control: 'text' },
    buttons: { control: 'object' },
    searchBar: { control: 'object' }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Header>

// --- 스토리 케이스 ---
export const Default: Story = {
  args: {
    title: '스페이스',
    buttons,
    searchBar: {
      placeholder: '스페이스에서 입력하세요'
    }
  }
}

export const NoButtons: Story = {
  args: {
    title: '검색 전용 헤더',
    searchBar: {
      placeholder: '검색어를 입력하세요'
    }
  }
}

export const OneButton: Story = {
  args: {
    title: '버튼 1개만 있는 헤더',
    buttons: [
      {
        label: '불러오기',
        icon: Settings as LucideIcon,
        onClick: () => {}
      }
    ],
    searchBar: {
      placeholder: '검색어를 입력하세요'
    }
  }
}
