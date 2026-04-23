import React, { useState, useEffect } from 'react';
import { X, Play, ClipboardList, CheckSquare, Zap, StopCircle, Trash2 } from 'lucide-react';
import { useFlow } from '@/context/FlowContext';
import { NODE_META } from '@/types/nodes';
import StartForm from '@/components/NodeForm/StartForm';
import TaskForm from '@/components/NodeForm/TaskForm';
import ApprovalForm from '@/components/NodeForm/ApprovalForm';
import AutomatedForm from '@/components/NodeForm/AutomatedForm';
import EndForm from '@/components/NodeForm/EndForm';

const ICONS = { Play, ClipboardList, CheckSquare, Zap, StopCircle };

const TABS = ['Properties', 'Advanced'];

function NodeFormPanel() {
  const { selectedNode, updateNodeData, removeNode, selectNode } = useFlow();
  const [activeTab, setActiveTab] = useState('Properties');
  const [localData, setLocalData] = useState({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      setLocalData({ ...selectedNode.data });
      setDirty(false);
      setActiveTab('Properties');
    }
  }, [selectedNode?.id]);

  if (!selectedNode) {
    return (
      <aside className="w-[360px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <ClipboardList size={28} className="text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">No node selected</p>
        <p className="text-xs text-gray-400 mt-1">Click a node on the canvas to inspect and edit its properties.</p>
      </aside>
    );
  }

  const meta = NODE_META[selectedNode.type] || { fill: '#F6F8FA', accent: '#94a3b8', icon: 'ClipboardList', label: 'Node' };
  const Icon = ICONS[meta.icon] || ClipboardList;

  const handleChange = (partial) => {
    setLocalData(prev => ({ ...prev, ...partial }));
    setDirty(true);
  };

  const handleSave = () => {
    updateNodeData(selectedNode.id, localData);
    setDirty(false);
  };

  const handleDelete = () => {
    removeNode(selectedNode.id);
  };

  const handleClose = () => {
    selectNode(null);
  };

  const renderForm = () => {
    const props = { data: localData, onChange: handleChange };
    switch (selectedNode.type) {
      case 'start': return <StartForm {...props} />;
      case 'task': return <TaskForm {...props} />;
      case 'approval': return <ApprovalForm {...props} />;
      case 'automated': return <AutomatedForm {...props} />;
      case 'end': return <EndForm {...props} />;
      default: return <p className="text-sm text-gray-500">No form available for this node type.</p>;
    }
  };

  return (
    <aside className="w-[360px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col panel-slide">
      {/* Node header */}
      <div
        className="px-5 py-4 border-b border-gray-100"
        style={{ borderLeft: `4px solid ${meta.accent}` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 32, height: 32, background: meta.fill }}
            >
              <Icon size={15} style={{ color: meta.accent }} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: meta.accent }}>
                {meta.label} Node
              </p>
              <p className="text-sm font-semibold text-gray-800 truncate max-w-[180px]">
                {localData.title || localData.label || `${meta.label} Node`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete node"
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close panel"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Node ID badge */}
        <p className="text-xs text-gray-400 mt-1 font-mono">{selectedNode.id}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              activeTab === tab
                ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {activeTab === 'Properties' && renderForm()}
        {activeTab === 'Advanced' && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Node ID</p>
              <code className="block text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono break-all">
                {selectedNode.id}
              </code>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Node Data (JSON)</p>
              <pre className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 overflow-auto max-h-48">
                {JSON.stringify(localData, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Position</p>
              <code className="block text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono">
                x: {Math.round(selectedNode.position?.x || 0)}, y: {Math.round(selectedNode.position?.y || 0)}
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Save footer */}
      <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
        <button
          onClick={handleSave}
          disabled={!dirty}
          className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: dirty ? '#3949FF' : '#E8EAFF',
            color: dirty ? '#fff' : '#3949FF',
          }}
        >
          {dirty ? 'Save Changes' : 'No Changes'}
        </button>
        {dirty && (
          <button
            onClick={() => { setLocalData({ ...selectedNode.data }); setDirty(false); }}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </aside>
  );
}

export default NodeFormPanel;