import React from 'react';
import { Mail } from 'lucide-react';
import NodeBase from '@/components/Nodes/NodeBase';

function EndNode({ id, data, selected }) {
  return (
    <NodeBase id={id} type="end" data={data} selected={selected} hasSource={false}>
      <p className="text-sm font-semibold text-gray-800 truncate">{data.label || 'End'}</p>
      {data.sendSummary && (
        <span className="flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium w-fit">
          <Mail size={10} strokeWidth={2.5} />
          {data.summaryRecipient || 'Send summary'}
        </span>
      )}
    </NodeBase>
  );
}

export default EndNode;