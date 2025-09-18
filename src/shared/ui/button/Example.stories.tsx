import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Example } from './Example'

const meta = {
  title: 'Shared/Example',
  component: Example,
  tags: ['autodocs'], // 자동 문서화
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'neutral']
    },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    disabled: false
  }
}

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}

export const Neutral: Story = {
  args: {
    children: 'Neutral Button',
    variant: 'neutral'
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}
