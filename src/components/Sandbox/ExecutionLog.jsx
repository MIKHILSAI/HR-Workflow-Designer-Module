import React from 'react';
import { CheckCircle2, XCircle, Clock, Play, ClipboardList, CheckSquare, Zap, StopCircle } from 'lucide-react';
import { NODE_META } from '@/types/nodes';

const ICONS = { Play, ClipboardList, CheckSquare, Zap, StopCircle };

function StatusPill({ status }) {
  const config = {
    success: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', label: 'Success', Icon: CheckCircle2 },
    failed: { bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200', label: 'Failed', Icon: XCircle },
    pending: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', label: 'Pending', Icon: Clock },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      <c.Icon size={10} strokeWidth={2.5} />
      {c.label}
    </span>
  );
}

function ExecutionStep({ step, index }) {
  const meta = NODE_META[step.nodeType] || { fill: '#F6F8FA', accent: '#94a3b8', icon: 'ClipboardList', label: 'Node' };
  const Icon = ICONS[meta.icon] || ClipboardList;

  return (
    <div className="log-item-enter flex gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors">
      {/* Step indicator */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: meta.fill }}
        >
          <Icon size={14} style={{ color: meta.accent }} strokeWidth={2.2} />
        </div>
        {index > 0 && <div className="w-px h-3 bg-gray-200" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="text-xs text-gray-400 font-mono">Step {index + 1}</span>
            <p className="text-sm font-semibold text-gray-800">{step.title}</p>
          </div>
          <StatusPill status={step.status} />
        </div>

        {/* Logs */}
        {step.logs && step.logs.length > 0 && (
          <div className="mt-2 space-y-0.5">
            {step.logs.map((log, i) => (
              <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                <span className="text-gray-300 mt-0.5 flex-shrink-0">›</span>
                {log}
              </p>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-1">
          {step.timestamp ? new Date(step.timestamp).toLocaleTimeString() : ''}
        </p>
      </div>
    </div>
  );
}

function ExecutionLog({ steps }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-sm">No steps to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <ExecutionStep key={step.stepId} step={step} index={idx} />
      ))}
    </div>
  );
}

export default ExecutionLog;