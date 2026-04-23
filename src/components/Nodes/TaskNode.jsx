import React from 'react';
import { User, Calendar } from 'lucide-react';
import NodeBase from '@/components/Nodes/NodeBase';

function TaskNode({ id, data, selected }) {
  return (
    <NodeBase id={id} type="task" data={data} selected={selected}>
      <p className="text-sm font-semibold text-gray-800 truncate">{data.title || 'Task'}</p>
      {data.description && (
        <p className="text-xs text-gray-500 mt-0.5 truncate">{data.description}</p>
      )}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {data.assignee && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#2B9CFF]/10 text-[#2B9CFF] font-medium">
            <User size={10} strokeWidth={2.5} />
            {data.assignee}
          </span>
        )}
        {data.dueDate && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
            <Calendar size={10} strokeWidth={2.5} />
            {data.dueDate}
          </span>
        )}
      </div>
    </NodeBase>
  );
}

export default TaskNode;