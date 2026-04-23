import React from 'react';
import { ShieldCheck, User } from 'lucide-react';
import NodeBase from '@/components/Nodes/NodeBase';

function ApprovalNode({ id, data, selected }) {
  return (
    <NodeBase id={id} type="approval" data={data} selected={selected}>
      <p className="text-sm font-semibold text-gray-800 truncate">{data.title || 'Approval'}</p>
      {data.description && (
        <p className="text-xs text-gray-500 mt-0.5 truncate">{data.description}</p>
      )}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {data.approverRole && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#FFB020]/10 text-[#FFB020] font-medium">
            <ShieldCheck size={10} strokeWidth={2.5} />
            {data.approverRole}
          </span>
        )}
        {data.approverEmail && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
            <User size={10} strokeWidth={2.5} />
            {data.approverEmail}
          </span>
        )}
        {data.autoApprove && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
            Auto
          </span>
        )}
      </div>
    </NodeBase>
  );
}

export default ApprovalNode;