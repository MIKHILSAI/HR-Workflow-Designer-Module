import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import FormField from '@/components/NodeForm/FormField';

function TaskForm({ data, onChange }) {
  const customFields = data.customFields || [];

  const addCustomField = () => {
    onChange({ customFields: [...customFields, { key: '', value: '' }] });
  };

  const updateCustomField = (idx, field, value) => {
    const updated = customFields.map((f, i) => i === idx ? { ...f, [field]: value } : f);
    onChange({ customFields: updated });
  };

  const removeCustomField = (idx) => {
    onChange({ customFields: customFields.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <FormField label="Title" required error={!data.title?.trim() ? 'Required' : ''}>
        <input
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white"
          value={data.title || ''}
          onChange={e => onChange({ title: e.target.value })}
          placeholder="e.g. Collect Documents"
        />
      </FormField>

      <FormField label="Description">
        <textarea
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white resize-none"
          rows={3}
          value={data.description || ''}
          onChange={e => onChange({ description: e.target.value })}
          placeholder="Task details..."
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Assignee">
          <input
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={data.assignee || ''}
            onChange={e => onChange({ assignee: e.target.value })}
            placeholder="Name or role"
          />
        </FormField>
        <FormField label="Due Date">
          <input
            type="date"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={data.dueDate || ''}
            onChange={e => onChange({ dueDate: e.target.value })}
          />
        </FormField>
      </div>

      {/* Custom fields */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Custom Fields</span>
          <button
            onClick={addCustomField}
            className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        {customFields.length === 0 && (
          <p className="text-xs text-gray-400 italic">No custom fields added.</p>
        )}
        <div className="space-y-2">
          {customFields.map((f, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                placeholder="Key"
                value={f.key}
                onChange={e => updateCustomField(idx, 'key', e.target.value)}
              />
              <input
                className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                placeholder="Value"
                value={f.value}
                onChange={e => updateCustomField(idx, 'value', e.target.value)}
              />
              <button onClick={() => removeCustomField(idx)} className="text-gray-400 hover:text-red-400">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;