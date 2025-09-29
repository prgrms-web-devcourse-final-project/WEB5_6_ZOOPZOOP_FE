import { FlowDashboard } from '@/widgets/dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '대시보드',
  description: '플로우 기반 대시보드'
}

export default function Page() {
  return <FlowDashboard />
}
