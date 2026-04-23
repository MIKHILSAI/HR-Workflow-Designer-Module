import React, { useState } from 'react';
import { X, Play, ChevronDown, ChevronRight, Download, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useFlow } from '@/context/FlowContext';
import { postSimulate } from '@/services/api';
import { validateGraph } from '@/utils/graph';
import ExecutionLog from '@/components/Sandbox/ExecutionLog';

function SimulatorPanel() {
  const {
    nodes, edges, serialize,
    simulationResult, setSimulationResult,
    isSimulating, setSimulating,
    setSimulationOpen, setValidationErrors,
  } = useFlow();

  const [jsonExpanded, setJsonExpanded] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRun = async () => {
    const { errors, globalErrors } = validateGraph(nodes, edges);
    setValidationErrors(errors);

    if (globalErrors.length > 0) {
      setSimulationResult({
        result: [],
        summary: { success: false, errors: globalErrors, totalSteps: 0 },
      });
      setHasRun(true);
      return;
    }

    setSimulating(true);
    setHasRun(false);
    try {
      const graph = serialize();
      const result = await postSimulate(graph);
      setSimulationResult(result);
      setHasRun(true);
    } finally {
      setSimulating(false);
    }
  };

  const handleExportResult = () => {
    if (!simulationResult) return;
    const json = JSON.stringify(simulationResult, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simulation-result.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const graph = serialize();
  const isSuccess = simulationResult?.summary?.success;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,36,0.5)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Play size={14} className="text-indigo-500" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Workflow Simulator</h2>
              <p className="text-xs text-gray-400">{nodes.length} nodes · {edges.length} edges</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasRun && simulationResult && (
              <button
                onClick={handleExportResult}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download size={12} /> Export
              </button>
            )}
            <button
              onClick={() => setSimulationOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* JSON Payload */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setJsonExpanded(!jsonExpanded)}
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Workflow JSON Payload</span>
              {jsonExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {jsonExpanded && (
              <pre className="text-xs text-gray-600 p-4 overflow-auto max-h-48 bg-white font-mono">
                {JSON.stringify(graph, null, 2)}
              </pre>
            )}
          </div>

          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={isSimulating || nodes.length === 0}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#3949FF', color: '#fff' }}
          >
            {isSimulating ? (
              <><Loader2 size={15} className="animate-spin" /> Running Simulation...</>
            ) : (
              <><Play size={15} /> Run Simulation</>
            )}
          </button>

          {/* Result summary */}
          {hasRun && simulationResult?.summary && (
            <div className={`flex items-start gap-3 p-4 rounded-xl border ${
              isSuccess
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              {isSuccess
                ? <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                : <XCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              }
              <div>
                <p className={`text-sm font-semibold ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
                  {isSuccess ? `Simulation Passed — ${simulationResult.summary.totalSteps} steps` : 'Simulation Failed'}
                </p>
                {!isSuccess && simulationResult.summary.errors?.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {simulationResult.summary.errors.map((err, i) => (
                      <li key={i} className="text-xs text-red-500 flex items-start gap-1.5">
                        <AlertTriangle size={10} className="mt-0.5 flex-shrink-0" />
                        {err}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Execution log */}
          {hasRun && simulationResult?.result?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Execution Timeline</p>
              <ExecutionLog steps={simulationResult.result} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimulatorPanel;