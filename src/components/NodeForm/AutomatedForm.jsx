import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import FormField from '@/components/NodeForm/FormField';
import { useFlow } from '@/context/FlowContext';
import { fetchAutomations } from '@/services/api';

function AutomatedForm({ data, onChange }) {
  const { automations, setAutomations } = useFlow();

  useEffect(() => {
    if (automations.length === 0) {
      fetchAutomations().then(setAutomations);
    }
  }, [automations.length, setAutomations]);

  const selectedAction = automations.find(a => a.id === data.actionId);

  const handleActionChange = (actionId) => {
    const action = automations.find(a => a.id === actionId);
    const newParams = {};
    if (action) {
      action.params.forEach(p => { newParams[p] = data.actionParams?.[p] || ''; });
    }
    onChange({ actionId, actionParams: newParams });
  };

  const handleParamChange = (param, value) => {
    onChange({ actionParams: { ...data.actionParams, [param]: value } });
  };

  return (
    <div className="space-y-4">
      <FormField label="Title">
        <input
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          value={data.title || ''}
          onChange={e => onChange({ title: e.target.value })}
          placeholder="e.g. Generate Offer Letter"
        />
      </FormField>

      <FormField label="Action" required helper="Select an automated action to execute">
        {automations.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
            <Loader2 size={14} className="animate-spin" />
            Loading actions...
          </div>
        ) : (
          <select
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={data.actionId || ''}
            onChange={e => handleActionChange(e.target.value)}
          >
            <option value="">Select action...</option>
            {automations.map(a => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        )}
      </FormField>

      {/* Dynamic params based on selected action */}
      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Action Parameters</p>
          {selectedAction.params.map(param => (
            <FormField key={param} label={param}>
              <input
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                value={data.actionParams?.[param] || ''}
                onChange={e => handleParamChange(param, e.target.value)}
                placeholder={`Enter ${param}...`}
              />
            </FormField>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutomatedForm;