import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Play, ClipboardList, CheckSquare, Zap, StopCircle, AlertCircle } from 'lucide-react';
import { NODE_META } from '@/types/nodes';
import { useFlow } from '@/context/FlowContext';

const ICONS = {
  Play, ClipboardList, CheckSquare, Zap, StopCircle,
};

function NodeBase({ id, type, data, selected, hasSource = true, hasTarget = true, children }) {
  const meta = NODE_META[type] || { fill: '#F6F8FA', accent: '#94a3b8', icon: 'ClipboardList', label: type };
  const Icon = ICONS[meta.icon] || ClipboardList;
  const { validationErrors } = useFlow();
  const errors = validationErrors[id] || [];
  const hasErrors = errors.length > 0;

  return (
    <div
      className="relative"
      style={{
        minWidth: 200,
        maxWidth: 240,
        background: meta.fill,
        border: `2px solid ${selected ? '#3949FF' : hasErrors ? '#EF4444' : meta.accent}`,
        borderRadius: 10,
        boxShadow: selected
          ? `0 0 0 3px rgba(57,73,255,0.15), 0 2px 8px rgba(12,24,40,0.08)`
          : '0 1px 4px rgba(12,24,40,0.06)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t-[8px]"
        style={{ borderBottom: `1px solid ${meta.accent}22` }}
      >
        <div
          className="flex items-center justify-center rounded-md"
          style={{ width: 26, height: 26, background: meta.accent + '22' }}
        >
          <Icon size={14} style={{ color: meta.accent }} strokeWidth={2.2} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: meta.accent }}>
          {meta.label}
        </span>
        {hasErrors && (
          <div className="ml-auto" title={errors.join(', ')}>
            <AlertCircle size={14} color="#EF4444" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 py-2">
        {children}
      </div>

      {/* Handles */}
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ top: -6, background: '#fff', border: `2px solid ${meta.accent}`, width: 10, height: 10 }}
        />
      )}
      {hasSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ bottom: -6, background: '#fff', border: `2px solid ${meta.accent}`, width: 10, height: 10 }}
        />
      )}
    </div>
  );
}

export default NodeBase;