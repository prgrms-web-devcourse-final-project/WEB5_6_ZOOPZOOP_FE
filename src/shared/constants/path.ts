export const PATH = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/auth/login',
    EXTENSION: '/extension/success'
  },
  NEWS: {
    ROOT: '/news'
  },
  ARCHIVE: {
    ROOT: '/archive',
    TRASH: '/archive/trash'
  },
  SPACE: {
    ROOT: '/space',
    DASHBOARD: '/space/:id/dashboard',
    MANAGEMENT: '/space/:id/management',
    RECOMMEND: '/space/:id/news',
    DETAIL: '/space/:id/detail',
    TRASH: '/space/:id/trash'
  },
  PROFILE: {
    ROOT: '/profile'
  }
} as const
