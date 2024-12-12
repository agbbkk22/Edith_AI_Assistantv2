import React, { useState } from 'react';
import { ResponseTemplate } from '../../types/response';
import { Plus, Save, X } from 'lucide-react';

interface ResponseTemplateEditorProps {
  onSave: (template: Omit<ResponseTemplate, 'id'>) => void;
  onClose: () => void;
}

export function ResponseTemplateEditor({ onSave, onClose }: ResponseTemplateEditorProps) {
  const [name, setName] = useState('');
  const [pattern, setPattern] = useState('');
  const [response, setResponse] = useState('');
  const [category, setCategory] = useState<ResponseTemplate['category']>('general');
  const [tone, setTone] = useState<ResponseTemplate['tone']>('neutral');
  const [variables, setVariables] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      pattern,
      response,
      category,
      tone,
      variables: variables.split(',').map(v => v.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create Response Template</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Template Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pattern (RegExp)</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Response</label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ResponseTemplate['category'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="meeting">Meeting</option>
                <option value="update">Update</option>
                <option value="request">Request</option>
                <option value="followup">Follow-up</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ResponseTemplate['tone'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Variables (comma-separated)
            </label>
            <input
              type="text"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="RESPONSE_DATE, AVAILABLE_TIMES"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Template
          </button>
        </form>
      </div>
    </div>
  );
}