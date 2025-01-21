import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import OrgNode from './OrgNode';
import type { NodeData, EdgeData } from '../../types/career';

const nodeTypes = {
  orgNode: OrgNode
};

interface CareerGraphProps {
  initialNodes: Node<NodeData>[];
  initialEdges: Edge<EdgeData>[];
  onNodeClick?: (node: Node<NodeData>) => void;
}

export default function CareerGraph({
  initialNodes,
  initialEdges,
  onNodeClick
}: CareerGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback((_, node: Node<NodeData>) => {
    onNodeClick?.(node);
  }, [onNodeClick]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[800px] bg-gray-50 rounded-xl overflow-hidden"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#6B7280'
          },
          style: {
            stroke: '#6B7280',
            strokeWidth: 2
          }
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </motion.div>
  );
} 