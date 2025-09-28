export interface FlowNodeData {
  image: string
  createdAt: string
  content: string
  title: string
  category: string
}

export interface FlowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: FlowNodeData
}
