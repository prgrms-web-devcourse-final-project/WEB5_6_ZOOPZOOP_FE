import { StoryObj } from '@storybook/nextjs-vite'
import { CreateSpaceModal } from './CreateSpaceModal'

const meta = {
  title: 'Shared/Modal/CreateSpaceModal',
  component: CreateSpaceModal,
  argTypes: {
    initialStep: { control: 'select', options: [1, 2] }
  },
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Step1: Story = {
  args: {
    initialStep: 1
  }
}

export const Step2: Story = {
  args: {
    initialStep: 2
  }
}
