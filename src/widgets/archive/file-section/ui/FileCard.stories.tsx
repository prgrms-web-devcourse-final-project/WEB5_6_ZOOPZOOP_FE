import FileCard from '@/widgets/archive/file-section/ui/FileCard'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
    createdAt: '2024-03-15',
    imageUrl: 'https://via.placeholder.com/250x108',
    sourceUrl: 'https://example.com/react-guide',
    ownerProfileUrl: 'https://github.com/shadcn.png'
  }
}

export const Selected: Story = {
  args: {
    id: 2,
    title: 'Next.js 14 App Router 완벽 가이드',
    category: 'Backend',
    createdAt: '2024-03-10',
    imageUrl: 'https://via.placeholder.com/250x108',
    sourceUrl: 'https://nextjs.org/docs',
    ownerProfileUrl: 'https://github.com/shadcn.png'
  }
}

export const PersonalArchive: Story = {
  args: {
    id: 3,
    title: 'TypeScript 실전 활용법',
    category: 'Language',
    createdAt: '2024-03-05',
    imageUrl: 'https://via.placeholder.com/250x108',
    sourceUrl: 'https://typescript.org'
  }
}

export const PersonalArchiveSelected: Story = {
  args: {
    id: 4,
    title: 'TypeScript 실전 활용법',
    category: 'Language',
    createdAt: '2024-03-01',
    imageUrl: '',
    sourceUrl: 'https://css-tricks.com'
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
          tags={['경제', '과학']}
          category="Frontend"
          createdAt={'2024-03-15'}
          imageUrl="https://via.placeholder.com/250x108"
          sourceUrl="https://example.com"
          ownerProfileUrl="https://github.com/shadcn.png"
          summary="정치 분야 기사 요약. SSD 관련 기술이 정치·정책과 연결된 맥락을 설명합니다."
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-600">선택됨</h3>
        <FileCard
          id={2}
          tags={['경제', '과학']}
          title="React 컴포넌트 설계"
          category="Frontend"
          summary="정치 분야 기사 요약. SSD 관련 기술이 정치·정책과 연결된 맥락을 설명합니다."
          createdAt={'2024-03-15'}
          imageUrl="https://via.placeholder.com/250x108"
          sourceUrl="https://example.com"
          ownerProfileUrl="https://github.com/shadcn.png"
        />
      </div>
    </div>
  )
}
