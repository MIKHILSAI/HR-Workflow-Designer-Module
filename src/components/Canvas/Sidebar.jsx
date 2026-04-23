import React from 'react';
import { NODE_PALETTE } from '@/types/nodes';
import { Play, ClipboardList, CheckSquare, Zap, StopCircle, Layers } from 'lucide-react';

const ICONS = { Play, ClipboardList, CheckSquare, Zap, StopCircle };

function PaletteItem({ item }) {
  const Icon = ICONS[item.icon] || ClipboardList;

  const onDragStart = (e) => {
    e.dataTransfer.setData('application/reactflow', item.type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group flex items-center gap-3 p-3 rounded-xl cursor-grab active:cursor-grabbing border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-150 select-none"
      style={{ background: item.fill }}
      title={`Drag to add ${item.label} node`}
    >
      <div
        className="flex items-center justify-center rounded-lg flex-shrink-0"
        style={{ width: 34, height: 34, background: item.accent + '22' }}
      >
        <Icon size={16} style={{ color: item.accent }} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
        <p className="text-xs text-gray-500 leading-tight">{item.description}</p>
      </div>
      <div
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs px-1.5 py-0.5 rounded font-medium"
        style={{ background: item.accent + '18', color: item.accent }}
      >
        drag
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex flex-col h-full w-[220px] flex-shrink-0 bg-white border-r border-gray-100">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-indigo-500" />
          <span className="text-sm font-semibold text-gray-700">Node Palette</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">Drag nodes onto canvas</p>
      </div>

      {/* Node types */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {NODE_PALETTE.map(item => (
          <PaletteItem key={item.type} item={item} />
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 leading-relaxed">
          Connect nodes by dragging from the bottom handle to the top handle of another node.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;