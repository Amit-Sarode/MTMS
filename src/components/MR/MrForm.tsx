import React, { useState } from 'react';
import { IMr, MrItem } from '../../types/mrTypes';


interface MrFormProps {
  onSubmit: (updatedMr: IMr) => void;
  onCancel: () => void;
  editData: IMr;
}

const MrForm: React.FC<MrFormProps> = ({ onSubmit, onCancel, editData }) => {
  const [clientName, setClientName] = useState(editData.clientName || '');
  const [createdDate, setCreatedDate] = useState(editData.createdDate || new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<MrItem[]>(editData.items || []);
  const [status, setStatus] = useState<IMr['status']>(editData.status || 'pending');

  const handleItemChange = (index: number, field: keyof MrItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMr: IMr = {
      ...editData,
      clientName,
      createdDate,
      items,
      status,
    };
    onSubmit(updatedMr);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 dark:text-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-900 dark:tet-gray-100">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 text-gray-900 dark:text-gray-100">Created Date</label>
          <input
            type="date"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className ="bg-white dark:bg-gray-800 p-4">
        <label className="text-gray-900 dark:text-gray-100">Items</label>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border p-4 rounded bg-gray-50">
            <div className='bg-white dark:bg-gray-800 p-4'>
              <label className="bg-white dark:bg-gray-800 p-4 block text-xs font-medium text-gray-700 mb-1">Item Name</label>
              <input
                type="text"
                value={item.itemName}
                onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as IMr['status'])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="pending">Pending</option>
          <option value="sent_to_supplier">Sent to Supplier</option>
          <option value="in_qa">In QA</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
        <button type="submit" className="primary">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default MrForm;
