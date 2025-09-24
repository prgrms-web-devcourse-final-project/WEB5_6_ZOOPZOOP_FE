import {
  Inbox,
  Trash2,
  LayoutGrid,
  ScrollText,
  Settings,
  ChartNetwork,
  TextSearch,
  Users,
  BotMessageSquare,
  LucideIcon
} from 'lucide-react'
import { PATH } from '../constants'

export type MainNav = {
  href: string
  label: string
  icon: LucideIcon
  count?: number
  children?: NavItem[]
}

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export const navItems: MainNav[] = [
  {
    href: PATH.ARCHIVE.ROOT,

    label: '아카이브',
    icon: Inbox,
    count: 123,
    children: [
      {
<<<<<<< HEAD:src/shared/routes/routes.ts
        /* TODO: 루트 변경 */
        href: PATH.ARCHIVE.ROOT,
=======
        href: '/archive/trash',
>>>>>>> 5d3e2f1 ([feat] 아카이브 - 하위 페이지 라우팅 및 메타 태그 추가):src/shared/lib/navigation.ts
        label: '휴지통',
        icon: Trash2
      }
    ]
  },
  {
    href: PATH.SPACE.ROOT,
    label: '스페이스',
    icon: LayoutGrid,
    count: 50,
    children: [
      {
        /* TODO: 루트 변경 */
        href: PATH.SPACE.ROOT,
        label: '차트 보기',
        icon: ChartNetwork
      },
      {
        /* TODO: 루트 변경 */
        href: PATH.SPACE.ROOT,
        label: '자세히 보기',
        icon: TextSearch
      },
      {
        /* TODO: 루트 변경 */
        href: PATH.SPACE.ROOT,
        label: '팀원 관리',
        icon: Users
      },
      {
        /* TODO: 루트 변경 */
        href: PATH.SPACE.ROOT,
        label: 'Ai 추천 받기',
        icon: BotMessageSquare
      },
      {
        /* TODO: 루트 변경 */
        href: PATH.SPACE.ROOT,
        label: '휴지통',
        icon: Trash2
      }
    ]
  },
  { href: PATH.NEWS.ROOT, label: '뉴스', icon: ScrollText },

  { href: PATH.PROFILE.ROOT, label: '계정 관리', icon: Settings }
]
