import { StoryObj } from '@storybook/nextjs-vite'
import { UrlUploadModal } from './UrlUploadModal'

const meta = {
  title: 'Shared/Modal/UrlUploadModal',
  component: UrlUploadModal
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
