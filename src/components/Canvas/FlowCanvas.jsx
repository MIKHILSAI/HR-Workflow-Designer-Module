import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlow } from '@/context/FlowContext';
import { getDefaultNodeData } from '@/types/nodes';
import StartNode from '@/components/Nodes/StartNode';
import TaskNode from '@/components/Nodes/TaskNode';
import ApprovalNode from '@/components/Nodes/ApprovalNode';
import AutomatedNode from '@/components/Nodes/AutomatedNode';
import EndNode from '@/components/Nodes/EndNode';
import CanvasToolbar from '@/components/Canvas/CanvasToolbar';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

let idCounter = 100;
function genId() { return `node_${Date.now()}_${idCounter++}`; }

function FlowCanvasInner() {
  const {
    nodes, edges, selectedNodeId,
    onNodesChange, onEdgesChange, onConnect,
    addNode, selectNode,
  } = useFlow();

  const reactFlowWrapper = useRef(null);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const bounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = e.clientX - bounds.left - 100;
    const y = e.clientY - bounds.top - 40;

    addNode(type, { x, y });
  }, [addNode]);

  const onNodeClick = useCallback((e, node) => {
    selectNode(node.id);
  }, [selectNode]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  // Mark selected node
  const nodesWithSelection = nodes.map(n => ({
    ...n,
    selected: n.id === selectedNodeId,
  }));

  return (
    <div
      ref={reactFlowWrapper}
      className="w-full h-full relative"
      style={{ background: 'var(--canvas-bg)' }}
    >
      <CanvasToolbar />
      <ReactFlow
        nodes={nodesWithSelection}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Shift"
        style={{ width: '100%', height: '100%', background: 'var(--canvas-bg)' }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#94a3b8', strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="#CBD5E1"
        />
        <Controls position="bottom-left" />
        <MiniMap
          position="bottom-right"
          nodeColor={(n) => {
            const colors = { start: '#29C08A', task: '#2B9CFF', approval: '#FFB020', automated: '#7A5CFF', end: '#5E6B7A' };
            return colors[n.type] || '#94a3b8';
          }}
          style={{ background: 'white', border: '1px solid #E2E8F0' }}
        />
      </ReactFlow>
    </div>
  );
}

function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '100%' }}>
        <FlowCanvasInner />
      </div>
    </ReactFlowProvider>
  );
}

export default FlowCanvas;