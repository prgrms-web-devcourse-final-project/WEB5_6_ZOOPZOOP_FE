/* eslint-disable no-console */
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import NotificationItem from './NotificationItem'

const meta = {
  title: 'Components/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '초대를 보낸  스페이스의 이름'
    },
    thumbnailUrl: {
      control: 'text',
      description: '스페이스 썸네일 이미지 URL'
    },
    onSubmit: {
      action: 'submitted',
      description: '수락 버튼 클릭 시 실행되는 콜백'
    },
    onCancel: {
      action: 'cancelled',
      description: '거절 버튼 클릭 시 실행되는 콜백'
    }
  },
  decorators: [
    Story => (
      <ul className="w-80 bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Story />
      </ul>
    )
  ]
} satisfies Meta<typeof NotificationItem>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 기본 스토리
 * 썸네일 이미지가 있는 일반적인 상태
 */
export const Default: Story = {
  args: {
    name: 'UX 디자인 팀',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
    onCancel: () => {},
    onSubmit: () => {}
  }
}

/**
 * 썸네일 없는 상태
 * thumbnailUrl이 없을 때 이니셜이 표시되는지 확인
 */
export const WithoutThumbnail: Story = {
  args: {
    name: '프론트엔드 개발',
    thumbnailUrl: '',
    onCancel: () => {},
    onSubmit: () => {}
  }
}

/**
 * 긴 이름 처리
 * truncate가 제대로 작동하는지 테스트
 */
export const LongName: Story = {
  args: {
    name: '아주 긴 이름을 가진 스페이스 이름 테스트용 매우 긴 텍스트',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop',
    onCancel: () => {},
    onSubmit: () => {}
  }
}

/**
 * 여러 개의 알림 리스트
 * 실제 사용 시나리오처럼 여러 아이템을 표시
 * decorators를 오버라이드하여 커스텀 레이아웃 제공
 */
export const MultipleItems: Story = {
  args: {
    name: '',
    thumbnailUrl: '',
    onSubmit: () => {},
    onCancel: () => {}
  },
  render: () => {
    const notifications = [
      {
        id: 1,
        name: 'UX 디자인 팀',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: '프론트엔드 개발',
        thumbnailUrl: ''
      },
      {
        id: 3,
        name: '마케팅 전략회의',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop'
      },
      {
        id: 4,
        name: '데이터 분석팀',
        thumbnailUrl: ''
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
            <NotificationItem
              key={notification.id}
              name={notification.name}
              thumbnailUrl={notification.thumbnailUrl}
              onSubmit={() => console.log(`${notification.name} 수락`)}
              onCancel={() => console.log(`${notification.name} 거절`)}
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
    name: '호버 테스트',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
    onCancel: () => {},
    onSubmit: () => {}
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
