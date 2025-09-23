import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import FileCard from './FileCard'

const meta: Meta<typeof FileCard> = {
  title: 'Components/FileCard',
  component: FileCard,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    title: 'TypeScript 실전 활용법',
    category: 'Frontend',
    createAt: new Date('2024-03-15'),
    imageUrl: 'https://via.placeholder.com/250x108',
    sourceUrl: 'https://example.com/react-guide',
    ownerProfileUrl: 'https://github.com/shadcn.png',
    isSelected: false
  }
}

export const Selected: Story = {
  args: {
    id: 2,
    title: 'Next.js 14 App Router 완벽 가이드',
    category: 'Backend',
    createAt: new Date('2024-03-10'),
    imageUrl: 'https://via.placeholder.com/250x108',
    sourceUrl: 'https://nextjs.org/docs',
    ownerProfileUrl: 'https://github.com/shadcn.png',
    isSelected: true
  }
}

export const PersonalArchive: Story = {
  args: {
    id: 3,
    title: 'TypeScript 실전 활용법',
    category: 'Language',
    createAt: new Date('2024-03-05'),
    imageUrl: 'https://via.placeholder.com/250x108',
    sourceUrl: 'https://typescript.org',
    isSelected: false
  }
}

export const PersonalArchiveSelected: Story = {
  args: {
    id: 4,
    title: 'TypeScript 실전 활용법',
    category: 'Language',
    createAt: new Date('2024-03-01'),
    imageUrl: '',
    sourceUrl: 'https://css-tricks.com',
    isSelected: true
  }
}

export const SelectionComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-600">
          선택되지 않음
        </h3>
        <FileCard
          id={1}
          title="React 컴포넌트 설계"
          category="Frontend"
          createAt={new Date('2024-03-15')}
          imageUrl="https://via.placeholder.com/250x108"
          sourceUrl="https://example.com"
          ownerProfileUrl="https://github.com/shadcn.png"
          isSelected={false}
          onSelect={() => {}}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-600">선택됨</h3>
        <FileCard
          id={2}
          title="React 컴포넌트 설계"
          category="Frontend"
          createAt={new Date('2024-03-15')}
          imageUrl="https://via.placeholder.com/250x108"
          sourceUrl="https://example.com"
          ownerProfileUrl="https://github.com/shadcn.png"
          isSelected={true}
          onSelect={() => {}}
        />
      </div>
    </div>
  )
}
