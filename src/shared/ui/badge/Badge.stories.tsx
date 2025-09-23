import { Meta } from '@storybook/nextjs-vite'
import { Badge } from './badge'

const meta = {
  tags: ['autodocs'],
  title: 'Badge',
  component: Badge,
  argTypes: {
    name: {
      control: 'select',
      options: [
        '정치',
        '경제',
        '사회',
        'IT',
        '과학',
        '문화',
        '스포츠',
        '환경',
        '역사',
        '세계'
      ]
    }
  }
} satisfies Meta<typeof Badge>

export default meta

export const Default = () => (
  <div className="flex gap-2">
    <Badge name="정치" />
    <Badge name="경제" />
    <Badge name="사회" />
    <Badge name="IT" />
    <Badge name="과학" />
    <Badge name="문화" />
    <Badge name="스포츠" />
    <Badge name="환경" />
    <Badge name="역사" />
    <Badge name="세계" />
  </div>
)
