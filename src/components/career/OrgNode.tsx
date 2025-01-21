import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import type { NodeData } from '../../types/career';

interface OrgNodeProps {
  data: NodeData;
  isConnectable: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const OrgNode = memo(({ data, isConnectable, selected, onClick }: OrgNodeProps) => {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'root':
        return 'bg-purple-600 text-white';
      case 'governance':
        return 'bg-blue-500 text-white';
      case 'subunit':
        return 'bg-green-500 text-white';
      case 'role':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        px-4 py-2 rounded-lg shadow-md cursor-pointer
        ${getNodeStyle()}
        ${selected ? 'ring-2 ring-purple-400 ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-gray-400"
      />
      
      <div className="text-center">
        <div className="font-bold">{data.label}</div>
        {data.level && (
          <div className="text-sm opacity-80">{data.level}</div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-gray-400"
      />
    </motion.div>
  );
});

OrgNode.displayName = 'OrgNode';

export default OrgNode; 