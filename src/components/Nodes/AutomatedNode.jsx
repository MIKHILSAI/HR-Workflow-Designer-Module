import React from 'react';
import { Cpu } from 'lucide-react';
import NodeBase from '@/components/Nodes/NodeBase';

function AutomatedNode({ id, data, selected }) {
  return (
    <NodeBase id={id} type="automated" data={data} selected={selected}>
      <p className="text-sm font-semibold text-gray-800 truncate">{data.title || 'Automated Action'}</p>
      {data.actionId && (
        <span className="flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full bg-[#7A5CFF]/10 text-[#7A5CFF] font-medium w-fit">
          <Cpu size={10} strokeWidth={2.5} />
          {data.actionId}
        </span>
      )}
      {data.actionParams && Object.keys(data.actionParams).length > 0 && (
        <div className="mt-1.5 space-y-0.5">
          {Object.entries(data.actionParams).slice(0, 2).map(([k, v]) => (
            <p key={k} className="text-xs text-gray-500 truncate">
              <span className="font-medium">{k}:</span> {v || '—'}
            </p>
          ))}
        </div>
      )}
    </NodeBase>
  );
}

export default AutomatedNode;