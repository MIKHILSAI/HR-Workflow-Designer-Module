import React from 'react';
import { Workflow, Github } from 'lucide-react';

function AppHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 flex-shrink-0 z-20">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500">
          <Workflow size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-none">HR Workflow Designer</h1>
          <p className="text-xs text-gray-400 mt-0.5">Visual workflow builder for HR teams</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-600">Ready</span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;