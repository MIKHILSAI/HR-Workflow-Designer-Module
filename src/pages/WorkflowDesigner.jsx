import React, { useEffect } from 'react';
import { FlowProvider, useFlow } from '@/context/FlowContext';
import FlowCanvas from '@/components/Canvas/FlowCanvas';
import Sidebar from '@/components/Canvas/Sidebar';
import NodeFormPanel from '@/components/NodeForm/NodeFormPanel';
import SimulatorPanel from '@/components/Sandbox/SimulatorPanel';
import AppHeader from '@/components/Common/AppHeader';
import { fetchAutomations } from '@/services/api';

function WorkflowDesignerInner() {
  const { simulationOpen, setAutomations, automations, addNode } = useFlow();

  useEffect(() => {
    if (automations.length === 0) {
      fetchAutomations().then(setAutomations);
    }
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hr_workflow_visited');
    if (!hasVisited) {
      sessionStorage.setItem('hr_workflow_visited', '1');
      setTimeout(() => {
        addNode('start', { x: 250, y: 80 });
      }, 300);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background font-inter">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative overflow-hidden h-full">
          <FlowCanvas />
        </main>
        <NodeFormPanel />
      </div>
      {simulationOpen && <SimulatorPanel />}
    </div>
  );
}

function WorkflowDesigner() {
  return (
    <FlowProvider>
      <WorkflowDesignerInner />
    </FlowProvider>
  );
}

export default WorkflowDesigner;