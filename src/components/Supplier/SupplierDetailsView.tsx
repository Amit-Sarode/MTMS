import React from 'react';
import { ISupplierStatus } from '../../types/supplierTypes';
import { ArrowRightCircle } from 'lucide-react';

interface SupplierDetailsViewProps {
  supplier: ISupplierStatus;
}

const SupplierDetailsView: React.FC<SupplierDetailsViewProps> = ({ supplier }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Supplier Details: {supplier.supplierName}</h3>
          <p className="text-sm text-gray-900 dark:text-gray-100">MR: {supplier.mrId.slice(0, 8).toUpperCase()} • Assigned: {supplier.assignedDate}</p>
        </div>
        
        <div className="flex space-x-2">
          {supplier.status === 'ready' && (
            <button className="primary text-sm flex items-center">
              <ArrowRightCircle size={16} className="mr-1" />
              Send to QA
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-white dark:bg-gray-800 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div>
            <p className="text-gray-900 dark:text-gray-100">Contact Person</p>
            <p className="font-medium">{supplier.contactPerson}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-100">Contact Number</p>
            <p className="font-medium">{supplier.contactNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-100">Status</p>
            <p className="font-medium capitalize">{supplier.status.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-100">Available Items</p>
            <p className="font-medium">{supplier.availableItems} / {supplier.totalItems}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white dark:bg-gray-800 p-4">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider">Item Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 pl-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {supplier.items.map((item) => (
                <tr key={item.id} className="dark:hover:bg-gray-800">
                  <td className="px-4 py-3 whitespace-nowrap font-medium">{item.itemName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.itemCode}</td>
                  <td className="px-4 py-3 pl-10 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.unit}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block min-w-[100px] px-3 py-1 text-center rounded-full text-white text-[10px] font-medium
                        ${
                          item.status === 'pending' ? 'bg-yellow-500' :
                          item.status === 'available' ? 'bg-green-500' :
                          item.status === 'unavailable' ? 'bg-red-500' :
                          item.status === 'partial' ? 'bg-orange-500' :
                          'bg-gray-400'
                        }
                      `}
                    >
                      {item.status === 'pending' ? 'Pending' :
                      item.status === 'available' ? 'Available' :
                      item.status === 'unavailable' ? 'Unavailable' :
                      item.status === 'partial' ? 'Partial' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsView;