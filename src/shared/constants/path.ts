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
    MANAGEMENT: '/space/:id/m',
    DETAIL: '/space/:id/detail',
    TRASH: '/space/:id/trash'
  },
  PROFILE: {
    ROOT: '/profile'
  }
} as const
