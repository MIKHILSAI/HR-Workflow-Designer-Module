import React from 'react';
import FormField from '@/components/NodeForm/FormField';

function EndForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <FormField label="Label">
        <input
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          value={data.label || ''}
          onChange={e => onChange({ label: e.target.value })}
          placeholder="End"
        />
      </FormField>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-700">Send Summary Email</p>
          <p className="text-xs text-gray-400">Notify stakeholders on completion</p>
        </div>
        <button
          onClick={() => onChange({ sendSummary: !data.sendSummary })}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            data.sendSummary ? 'bg-indigo-500' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              data.sendSummary ? 'translate-x-4' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {data.sendSummary && (
        <FormField label="Summary Recipient" helper="Email to receive workflow summary">
          <input
            type="email"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={data.summaryRecipient || ''}
            onChange={e => onChange({ summaryRecipient: e.target.value })}
            placeholder="hr@company.com"
          />
        </FormField>
      )}
    </div>
  );
}

export default EndForm;