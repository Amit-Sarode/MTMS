import React, { useState } from 'react';
import { Search, User, Building } from 'lucide-react';

interface SupplierSelectProps {
  onSelect: (supplierId: string) => void;
  onCancel: () => void;
}

const SupplierSelect: React.FC<SupplierSelectProps> = ({ onSelect, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock supplier data
  const suppliers = [
    { id: 'sup-1', name: 'Metal Works Inc.', contact: '+1 555-123-4567', category: 'Metal Fabrication' },
    { id: 'sup-2', name: 'Precision Parts Co.', contact: '+1 555-987-6543', category: 'Machined Parts' },
    { id: 'sup-3', name: 'Global Supplies Ltd.', contact: '+1 555-456-7890', category: 'Raw Materials' },
    { id: 'sup-4', name: 'Elite Components', contact: '+1 555-789-0123', category: 'Electronic Components' },
    { id: 'sup-5', name: 'Reliable Manufacturing', contact: '+1 555-234-5678', category: 'Custom Manufacturing' },
  ];
  
  const filteredSuppliers = searchTerm
    ? suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suppliers;

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-2 w-full border rounded-md focus:ring-primary"
        />
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredSuppliers.map((supplier) => (
          <div 
            key={supplier.id}
            onClick={() => onSelect(supplier.id)}
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer hover-scale flex items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center mr-3 flex-shrink-0">
              <Building size={20} />
            </div>
            <div>
              <h4 className="font-medium">{supplier.name}</h4>
              <p className="text-sm text-gray-500">{supplier.category}</p>
              <p className="text-sm text-gray-500">{supplier.contact}</p>
            </div>
          </div>
        ))}
        
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No suppliers found matching your search.
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button 
          type="button" 
          onClick={onCancel}
          className="secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SupplierSelect;