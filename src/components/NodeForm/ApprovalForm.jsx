import React from 'react';
import FormField from '@/components/NodeForm/FormField';

function ApprovalForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <FormField label="Title" required>
        <input
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          value={data.title || ''}
          onChange={e => onChange({ title: e.target.value })}
          placeholder="e.g. Manager Approval"
        />
      </FormField>

      <FormField label="Approver Role" required error={!data.approverRole?.trim() ? 'Approver role is required' : ''}>
        <select
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          value={data.approverRole || ''}
          onChange={e => onChange({ approverRole: e.target.value })}
        >
          <option value="">Select role...</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Department Head">Department Head</option>
          <option value="VP Operations">VP Operations</option>
          <option value="CEO">CEO</option>
          <option value="Legal Team">Legal Team</option>
          <option value="Finance">Finance</option>
        </select>
      </FormField>

      <FormField label="Approver Email" helper="Specific person to notify">
        <input
          type="email"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          value={data.approverEmail || ''}
          onChange={e => onChange({ approverEmail: e.target.value })}
          placeholder="approver@company.com"
        />
      </FormField>

      <FormField label="Description">
        <textarea
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white resize-none"
          rows={2}
          value={data.description || ''}
          onChange={e => onChange({ description: e.target.value })}
          placeholder="Why this approval is needed..."
        />
      </FormField>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-700">Auto-Approve</p>
          <p className="text-xs text-gray-400">Skip manual review</p>
        </div>
        <button
          onClick={() => onChange({ autoApprove: !data.autoApprove })}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            data.autoApprove ? 'bg-indigo-500' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              data.autoApprove ? 'translate-x-4' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default ApprovalForm;