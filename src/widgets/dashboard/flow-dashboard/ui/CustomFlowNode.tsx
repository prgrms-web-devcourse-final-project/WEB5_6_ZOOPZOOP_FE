import { BaseNewsCard } from '@/shared/ui/card'
import { FlowNodeData } from '../model/types'

interface Props {
  data: FlowNodeData
  selected: boolean
}
export const CustomFlowNode = ({ data, selected }: Props) => {
  const proxiedImageUrl = data.link?.trim()
    ? `/api/og-image?url=${encodeURIComponent(data.link)}`
    : data.imageUrl?.trim()
      ? `/api/thumbnail?src=${encodeURIComponent(data.imageUrl)}`
      : undefined

  const proxiedProfile = data.user?.profileUrl?.trim()
    ? {
        ...data.user,
        profileUrl: `/api/thumbnail?src=${encodeURIComponent(data.user.profileUrl)}`
      }
    : data.user

  return (
    <BaseNewsCard
      title={data.title}
      content={data.content}
      imageUrl={proxiedImageUrl}
      createdAt={data.createdAt}
      category={data.category}
      type="flow"
      user={proxiedProfile}
      link={data.link}
      selected={selected}
    />
  )
}
