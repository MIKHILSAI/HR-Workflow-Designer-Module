import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { ZoomIn, ZoomOut, Maximize2, Play, Download, Upload, Trash2 } from 'lucide-react';
import { useFlow } from '@/context/FlowContext';
import { validateGraph } from '@/utils/graph';

function ToolbarButton({ onClick, icon: Icon, label, variant = 'default', disabled }) {
  const base = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    default: "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300",
    primary: "bg-indigo-500 text-white hover:bg-indigo-600 border border-indigo-500",
    danger: "bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
      title={label}
      aria-label={label}
    >
      <Icon size={13} strokeWidth={2.2} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function CanvasToolbar() {
  const rf = useReactFlow();
  const { nodes, edges, setSimulationOpen, setValidationErrors, clearGraph, serialize, loadGraph } = useFlow();

  const handleRunSimulation = () => {
    const { errors, globalErrors } = validateGraph(nodes, edges);
    setValidationErrors(errors);
    if (globalErrors.length > 0) {
      alert('Validation failed:\n' + globalErrors.join('\n'));
      return;
    }
    setSimulationOpen(true);
  };

  const handleExport = () => {
    const data = serialize();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.nodes && data.edges) {
            loadGraph(data.nodes, data.edges);
            setTimeout(() => rf.fitView({ padding: 0.2 }), 100);
          }
        } catch {
          alert('Invalid workflow JSON file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
      <ToolbarButton icon={ZoomIn} label="Zoom In" onClick={() => rf.zoomIn()} />
      <ToolbarButton icon={ZoomOut} label="Zoom Out" onClick={() => rf.zoomOut()} />
      <ToolbarButton icon={Maximize2} label="Fit View" onClick={() => rf.fitView({ padding: 0.2 })} />

      <div className="w-px h-5 bg-gray-200 mx-1" />

      <ToolbarButton icon={Upload} label="Import" onClick={handleImport} />
      <ToolbarButton icon={Download} label="Export" onClick={handleExport} />
      <ToolbarButton icon={Trash2} label="Clear" onClick={clearGraph} variant="danger" />

      <div className="w-px h-5 bg-gray-200 mx-1" />

      <ToolbarButton
        icon={Play}
        label="Simulate"
        onClick={handleRunSimulation}
        variant="primary"
        disabled={nodes.length === 0}
      />
    </div>
  );
}

export default CanvasToolbar;