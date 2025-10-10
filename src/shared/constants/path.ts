export const PATH = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/auth/login'
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
    RECOMMEND: '/space/:id/news'
  },
  PROFILE: {
    ROOT: '/profile'
  }
} as const
