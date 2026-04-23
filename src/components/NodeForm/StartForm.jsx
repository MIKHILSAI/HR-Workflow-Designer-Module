import React from 'react';
import FormField from '@/components/NodeForm/FormField';

function StartForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <FormField label="Label" required>
        <input
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white"
          value={data.label || ''}
          onChange={e => onChange({ label: e.target.value })}
          placeholder="Start"
        />
      </FormField>
      <FormField label="Trigger Type" helper="How this workflow is initiated">
        <select
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white appearance-none"
          value={data.triggerType || 'manual'}
          onChange={e => onChange({ triggerType: e.target.value })}
        >
          <option value="manual">Manual</option>
          <option value="scheduled">Scheduled</option>
          <option value="event">Event-Based</option>
          <option value="form_submission">Form Submission</option>
        </select>
      </FormField>
      <FormField label="Description">
        <textarea
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white resize-none"
          rows={3}
          value={data.description || ''}
          onChange={e => onChange({ description: e.target.value })}
          placeholder="Optional description..."
        />
      </FormField>
    </div>
  );
}

export default StartForm;