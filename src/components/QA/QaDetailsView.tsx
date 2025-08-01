import React from 'react';
import { IQaStatus } from '../../types/qaTypes';
import { CheckCircle, XCircle, AlertTriangle, File } from 'lucide-react';

interface QaDetailsViewProps {
  qa: IQaStatus;
}

const QaDetailsView: React.FC<QaDetailsViewProps> = ({ qa }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">QA Check Details: {qa.mrId.slice(0, 8).toUpperCase()}</h3>
          <p className="text-sm text-gray-500">Supplier: {qa.supplierName} • Received: {qa.receivedDate}</p>
        </div>
        
        <div className="flex space-x-2">
          {(qa.status === 'pending' || qa.status === 'in_progress') && (
            <>
              <button className="primary text-sm flex items-center bg-green-600 hover:bg-green-700">
                <CheckCircle size={16} className="mr-1" />
                Approve All
              </button>
              <button className="secondary text-sm flex items-center text-red-600 border-red-600 hover:bg-red-50">
                <XCircle size={16} className="mr-1" />
                Reject
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">QA Inspector</p>
            <p className="font-medium">{qa.inspector || 'Not Assigned'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{qa.status.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="font-medium">{qa.totalItems}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Items Passed</p>
            <p className="font-medium">{qa.passedItems} / {qa.totalItems}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drawing</th>
                <th className="px-4 py-3 pl-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {qa.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium">{item.itemName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.itemCode}</td>
                  <td className="px-4 py-3 pl-10 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.drawingUrl ? (
                      <a 
                        href={item.drawingUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--primary))] hover:underline flex items-center"
                      >
                        <File size={16} className="mr-1" />
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No drawing</span>
                    )}
                  </td>
                 <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block min-w-[80px] px-3 py-1 text-center rounded-full text-white text-[10px] font-medium
                        ${
                          item.status === 'pending' ? 'bg-yellow-500' :
                          item.status === 'passed' ? 'bg-green-500' :
                          item.status === 'failed' ? 'bg-red-500' :
                          'bg-gray-400'
                        }
                      `}
                    >
                      {item.status === 'pending' ? 'Pending' :
                      item.status === 'passed' ? 'Passed' :
                      item.status === 'failed' ? 'Failed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.qaNote || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {item.status === 'pending' && (
                      <div className="flex items-center justify-end space-x-1">
                        <button className="p-1 rounded text-green-600 hover:bg-green-100">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-1 rounded text-red-600 hover:bg-red-100">
                          <XCircle size={18} />
                        </button>
                        <button className="p-1 rounded text-amber-600 hover:bg-amber-100">
                          <AlertTriangle size={18} />
                        </button>
                      </div>
                    )}
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

export default QaDetailsView;