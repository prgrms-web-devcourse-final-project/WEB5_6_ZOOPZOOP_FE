'use client'

import { useCallback, useState } from 'react'
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Edge,
  Node,
  OnNodesDelete,
  getIncomers,
  getOutgoers,
  getConnectedEdges
} from '@xyflow/react'

const initialNodes = [
  {
    id: 'n1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: {
      label: 'Input Node',
      nodeType: 'input',
      title: '입력 노드',
      content: '기본 입력 노드입니다',
      imageUrl: '',
      createdAt: '2025-01-01'
    }
  }
]

const initialEdges: Edge[] = []

export const useFlowState = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge({ ...connection }, eds)),
    []
  )

  const onNodesDelete: OnNodesDelete = useCallback(
    deleted => {
      let remainingNodes = [...nodes]
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, remainingNodes, acc)
          const outgoers = getOutgoers(node, remainingNodes, acc)
          const connectedEdges = getConnectedEdges([node], acc)

          const remainingEdges = acc.filter(
            edge => !connectedEdges.includes(edge)
          )

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target
            }))
          )

          remainingNodes = remainingNodes.filter(rn => rn.id !== node.id)

          return [...remainingEdges, ...createdEdges]
        }, edges)
      )
    },
    [nodes, edges]
  )

  return {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete
  }
}
