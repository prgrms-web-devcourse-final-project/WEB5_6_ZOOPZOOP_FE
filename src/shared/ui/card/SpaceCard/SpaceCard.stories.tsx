import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SpaceCard from './SpaceCard'

const meta: Meta<typeof SpaceCard> = {
  title: 'Components/SpaceCard',
  component: SpaceCard,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Frontend 개발팀 리소스',
    createdAt: new Date('2024-03-15'),
    contributors: [1, 2, 3]
  }
}

export const ManyContributors: Story = {
  args: {
    title: '풀스택 개발 프로젝트',
    createdAt: new Date('2024-03-10'),
    contributors: [1, 2, 3, 4, 5, 6, 7, 8]
  }
}

export const FewContributors: Story = {
  args: {
    title: '개인 학습 자료',
    createdAt: new Date('2024-03-12'),
    contributors: [1]
  }
}

export const LongTitle: Story = {
  args: {
    title:
      '매우 길고 복잡한 스페이스 제목입니다. 이런 경우에는 어떻게 표시될까요?',
    createdAt: new Date('2024-02-28'),
    contributors: [1, 2, 3, 4]
  }
}
export const SpaceGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <SpaceCard
        title="Frontend 개발팀"
        createdAt={new Date('2024-03-15')}
        contributors={[1, 2, 3]}
      />
      <SpaceCard
        title="Backend API 문서"
        createdAt={new Date('2024-03-10')}
        contributors={[1, 2, 3, 4, 5]}
      />
      <SpaceCard
        title="디자인 시스템"
        createdAt={new Date('2024-03-05')}
        contributors={[1, 2]}
      />
      <SpaceCard
        title="프로젝트 기획서 및 요구사항 정의"
        createdAt={new Date('2024-02-28')}
        contributors={[1, 2, 3, 4, 5, 6, 7]}
      />
    </div>
  )
}
