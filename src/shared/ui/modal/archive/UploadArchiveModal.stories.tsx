import { StoryObj } from '@storybook/nextjs-vite'
import { UploadArchiveModal } from './UploadArchiveModal'

const meta = {
  title: 'Shared/Modal/UploadArchiveModal',
  component: UploadArchiveModal
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
