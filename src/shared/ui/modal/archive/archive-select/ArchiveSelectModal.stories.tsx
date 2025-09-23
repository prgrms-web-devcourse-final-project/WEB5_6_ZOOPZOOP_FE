import { StoryObj } from '@storybook/nextjs-vite'
import { ArchiveSelectModal } from './ArchiveSelectModal'

const meta = {
  title: 'Shared/Modal/ArchiveSelectModal',
  component: ArchiveSelectModal
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
