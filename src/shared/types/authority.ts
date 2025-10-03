import { AUTHORITIES } from '../constants/authority'

export type Authority = (typeof AUTHORITIES)[keyof typeof AUTHORITIES]
