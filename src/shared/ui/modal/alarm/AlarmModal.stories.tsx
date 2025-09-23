import { StoryObj } from '@storybook/nextjs-vite'
import { AlarmModal } from './AlarmModal'

const meta = {
  title: 'Shared/Modal/AlarmModal',
  component: AlarmModal
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
