import React from 'react';
import { IMr } from '../../types/mrTypes';
import { Share, ArrowRightCircle, File, CheckSquare } from 'lucide-react';

interface MrDetailsViewProps {
  mr: IMr;
}

const MrDetailsView: React.FC<MrDetailsViewProps> = ({ mr }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">MR Details: {mr.id.slice(0, 8).toUpperCase()}</h3>
          <p className="text-sm text-gray-500">From BOM: {mr.bomId} • Client: {mr.clientName}</p>
        </div>
        
        <div className="flex space-x-2">
          
          <button className="secondary text-sm flex items-center">
            <Share size={16} className="mr-1" />
            Share via WhatsApp
          </button>
          {mr.status === 'pending' && (
            <button className="primary text-sm flex items-center">
              <ArrowRightCircle size={16} className="mr-1" />
              Send to Supplier
            </button>
          )}
          {mr.status === 'in_qa' && (
            <button className="primary text-sm flex items-center bg-green-600 hover:bg-green-700">
              <CheckSquare size={16} className="mr-1" />
              QA Approve
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Created Date</p>
            <p className="font-medium">{mr.createdDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{mr.status.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="font-medium">{mr.assignedTo || 'Not Assigned'}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 pl-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drawing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mr.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
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
                          'bg-gray-400'
                        }
                      `}
                    >
                      {item.status === 'pending' ? 'Pending' :
                      item.status === 'available' ? 'Available' :
                      item.status === 'unavailable' ? 'Unavailable' : 'Pending'}
                    </span>
                  </td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MrDetailsView;