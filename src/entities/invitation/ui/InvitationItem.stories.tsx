import { Meta, StoryObj } from '@storybook/nextjs-vite'
import InvitationItem from './InvitationItem'

const meta = {
  title: 'Components/InvitationItem',
  component: InvitationItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    spaceName: {
      control: 'text',
      description: '초대를 보낸  스페이스의 이름'
    },
    spaceThumbnailUrl: {
      control: 'text',
      description: '스페이스 썸네일 이미지 URL'
    }
  },
  decorators: [
    Story => (
      <ul className="w-80 bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Story />
      </ul>
    )
  ]
} satisfies Meta<typeof InvitationItem>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 기본 스토리
 * 썸네일 이미지가 있는 일반적인 상태
 */
export const Default: Story = {
  args: {
    spaceName: 'UX 디자인 팀',
    spaceThumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop'
  }
}

/**
 * 썸네일 없는 상태
 * spaceThumbnailUrl이 없을 때 이니셜이 표시되는지 확인
 */
export const WithoutThumbnail: Story = {
  args: {
    spaceName: '프론트엔드 개발',
    spaceThumbnailUrl: ''
  }
}

/**
 * 긴 이름 처리
 * truncate가 제대로 작동하는지 테스트
 */
export const LongName: Story = {
  args: {
    spaceName: '아주 긴 이름을 가진 스페이스 이름 테스트용 매우 긴 텍스트',
    spaceThumbnailUrl:
      'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop'
  }
}

/**
 * 여러 개의 알림 리스트
 * 실제 사용 시나리오처럼 여러 아이템을 표시
 * decorators를 오버라이드하여 커스텀 레이아웃 제공
 */
export const MultipleItems: Story = {
  args: {
    spaceName: '',
    spaceThumbnailUrl: ''
  },
  render: () => {
    const notifications = [
      {
        id: 1,
        spaceName: 'UX 디자인 팀',
        spaceThumbnailUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        spaceName: '프론트엔드 개발',
        spaceThumbnailUrl: ''
      },
      {
        id: 3,
        spaceName: '마케팅 전략회의',
        spaceThumbnailUrl:
          'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop'
      },
      {
        id: 4,
        spaceName: '데이터 분석팀',
        spaceThumbnailUrl: ''
      }
    ]

    return (
      <div className="w-80 bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            스페이스 초대
          </h3>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {notifications.length}개의 새로운 초대
          </p>
        </div>

        {/* 알림 리스트 */}
        <ul className="max-h-80 overflow-y-auto">
          {notifications.map(notification => (
            <InvitationItem
              key={notification.id}
              spaceName={notification.spaceName}
              spaceThumbnailUrl={notification.spaceThumbnailUrl}
            />
          ))}
        </ul>
      </div>
    )
  },

  decorators: []
}

/**
 * 호버 상태 강제 표시 (테스트용)
 * CSS로 호버 상태를 강제하여 버튼이 항상 보이도록 설정
 * 실제 호버 동작 확인용
 */
export const HoverState: Story = {
  args: {
    spaceName: '호버 테스트',
    spaceThumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop'
  },
  decorators: [
    Story => (
      <ul className="w-80 bg-white rounded-lg border border-slate-200 overflow-hidden">
        <style>{`
          .group .opacity-0 {
            opacity: 1 !important;
          }
        `}</style>
        <Story />
      </ul>
    )
  ]
}
