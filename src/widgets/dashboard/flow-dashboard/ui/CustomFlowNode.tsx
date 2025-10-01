import { BaseNewsCard } from '@/shared/ui/card'
import { FlowNodeData } from '../model/types'

interface Props {
  data: FlowNodeData
}

export const CustomFlowNode = ({ data }: Props) => (
  <BaseNewsCard
    title={data.title}
    content={data.content}
    imageUrl={data.imageUrl}
    createdAt={data.createdAt}
    category={data.category}
    type="flow"
    user={data.user}
    link={data.link}
  />
)
