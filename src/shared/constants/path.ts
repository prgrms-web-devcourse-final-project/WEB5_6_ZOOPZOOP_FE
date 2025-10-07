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
    MANAGEMENT: '/space/:id/m'
  },
  PROFILE: {
    ROOT: '/profile'
  }
} as const
