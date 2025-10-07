import { BaseNewsCard } from '@/shared/ui/card'
import { FlowNodeData } from '../model/types'

interface Props {
  data: FlowNodeData
  selected: boolean
}

export const CustomFlowNode = ({ data, selected }: Props) => (
  <BaseNewsCard
    title={data.title}
    content={data.content}
    imageUrl={data.imageUrl}
    createdAt={data.createdAt}
    category={data.category}
    type="flow"
    user={data.user}
    link={data.link}
    selected={selected}
  />
)
