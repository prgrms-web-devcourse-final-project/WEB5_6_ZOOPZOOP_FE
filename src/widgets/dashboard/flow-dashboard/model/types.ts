export interface FlowNodeData {
  createdAt: string
  content: string
  title: string
  category: string
  imageUrl: string
  link: string
  user: {
    name: string
    profileUrl: string
  }
}

export interface FlowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: FlowNodeData
}
