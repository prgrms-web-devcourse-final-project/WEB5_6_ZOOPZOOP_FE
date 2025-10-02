import { tw } from '@/shared/lib'
export type BadgeCategory =
  | 'POLITICS'
  | 'ECONOMY'
  | 'SOCIETY'
  | 'IT'
  | 'SCIENCE'
  | 'CULTURE'
  | 'SPORTS'
  | 'ENVIRONMENT'
  | 'HISTORY'
  | 'WORLD'

type BadgeConfig = {
  name: string
  color: string
  textColor: string
}

const BadgeList: Record<BadgeCategory, BadgeConfig> = {
  POLITICS: {
    name: '정치',
    color: 'bg-[#EFF6FF]',
    textColor: 'text-[#1D4ED8]'
  },
  ECONOMY: {
    name: '경제',
    color: 'bg-[#F0FDF4]',
    textColor: 'text-[#166534]'
  },
  SOCIETY: {
    name: '사회',
    color: 'bg-[#FEF3C7]',
    textColor: 'text-[#92400E]'
  },
  IT: { name: 'IT', color: 'bg-[#F3E8FF]', textColor: 'text-[#7C2D92]' },
  SCIENCE: {
    name: '과학',
    color: 'bg-[#E0F2FE]',
    textColor: 'text-[#0369A1]'
  },
  CULTURE: {
    name: '문화',
    color: 'bg-[#FAE8FF]',
    textColor: 'text-[#A21CAF]'
  },
  SPORTS: {
    name: '스포츠',
    color: 'bg-[#FEF2F2]',
    textColor: 'text-[#991B1B]'
  },
  ENVIRONMENT: {
    name: '환경',
    color: 'bg-[#ECFDF5]',
    textColor: 'text-[#047857]'
  },
  HISTORY: {
    name: '역사',
    color: 'bg-[#F5F3FF]',
    textColor: 'text-[#4C1D95]'
  },
  WORLD: {
    name: '세계',
    color: 'bg-[#EFF6FF]',
    textColor: 'text-[#1E3A8A]'
  }
}

interface Props {
  name: string
}

export const Badge = ({ name }: Props) => {
  return (
    <div
      className={tw(
        'w-fit px-3 py-1 rounded-full text-sm font-bold',
        BadgeList[name as keyof typeof BadgeList]?.color,
        BadgeList[name as keyof typeof BadgeList]?.textColor
      )}>
      {BadgeList[name as keyof typeof BadgeList]?.name}
    </div>
  )
}
