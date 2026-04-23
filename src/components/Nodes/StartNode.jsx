import React from 'react';
import NodeBase from '@/components/Nodes/NodeBase';

function StartNode({ id, data, selected }) {
  return (
    <NodeBase id={id} type="start" data={data} selected={selected} hasTarget={false}>
      <p className="text-sm font-semibold text-gray-800 truncate">{data.label || 'Start'}</p>
      {data.triggerType && (
        <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-[#29C08A]/10 text-[#29C08A] font-medium">
          {data.triggerType}
        </span>
      )}
      {data.description && (
        <p className="text-xs text-gray-500 mt-1 truncate">{data.description}</p>
      )}
    </NodeBase>
  );
}

export default StartNode;