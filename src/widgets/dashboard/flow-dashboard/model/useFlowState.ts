'use client'

import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Edge,
  Node,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  OnNodesDelete
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useState } from 'react'

const initialNodes = [
  {
    id: 'n1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Node 1',
      image: '/image.png',
      createdAt: '2025.01.01',
      content: 'Node 1',
      title: 'Node 1',
      category: '사회'
    }
  },
  {
    id: 'n2',
    type: 'custom',
    position: { x: 0, y: 500 },
    data: {
      label: 'Node 2',
      image: '/image.png',
      createdAt: '2025.01.01',
      content: 'Node 2',
      title: 'Node 2',
      category: '경제'
    }
  },
  {
    id: 'n3',
    type: 'custom',
    position: { x: 0, y: 1000 },
    data: {
      label: 'Node 3',
      image: '/image.png',
      createdAt: '2025.01.01',
      content: 'Node 3',
      title: 'Node 3',
      category: '사회'
    }
  }
]
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2', type: 'step' }]

export const useFlowState = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  const onConnect: OnConnect = useCallback(
    connection =>
      setEdges(eds => addEdge({ ...connection, type: 'step' }, eds)),
    [setEdges]
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
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete
  }
}
