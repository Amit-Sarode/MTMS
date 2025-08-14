import React, { useState, useEffect } from 'react';
import { RefreshCw, Filter, Search, Send, Share } from 'lucide-react';
import { ISupplierStatus } from '../../types/supplierTypes';
import { generateMockSupplierData } from '../../utils/mockData';
import SupplierDetailsView from './SupplierDetailsView';

interface SupplierStatusPageProps {
  searchTerm: string;
}

const SupplierStatusPage: React.FC<SupplierStatusPageProps> = ({ searchTerm }) => {
  const [supplierList, setSupplierList] = useState<ISupplierStatus[]>([]);
  const [filteredSupplierList, setFilteredSupplierList] = useState<ISupplierStatus[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplierStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const mockData = generateMockSupplierData(5);
      setSupplierList(mockData);
      setFilteredSupplierList(mockData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = supplierList.filter(supplier => 
        supplier.mrId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSupplierList(filtered);
    } else {
      setFilteredSupplierList(supplierList);
    }
  }, [searchTerm, supplierList]);
  
  const handleRowClick = (supplier: ISupplierStatus) => {
    setSelectedSupplier(supplier.id === selectedSupplier?.id ? null : supplier);
  };
  
  const handleSendToQA = (supplierId: string) => {
    // In a real app, this would send the items to QA
    const updatedList = supplierList.map(supplier => 
      supplier.id === supplierId 
        ? { ...supplier, status: 'in_qa' as ISupplierStatus['status'] } 
        : supplier
    );
    
    setSupplierList(updatedList);
    setFilteredSupplierList(updatedList);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw size={28} className="animate-spin text-[hsl(var(--primary))]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-900 dark:text-gray-100 font-bold">Production Readiness Review</h1>
      </div>
      
      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="secondary flex items-center space-x-2 text-sm">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <select className="rounded-md border border-gray-300 text-sm py-2">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="ready">Ready</option>
            <option value="in_qa">In QA</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-900 dark:text-gray-100" />
          </div>
          <input
            type="text"
            placeholder="Search suppliers..."
            className="pl-10 py-2 border rounded-md focus:ring-primary"
          />
        </div>
      </div>
      
      {/* Supplier Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 pl-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MR ID</th>
                <th className="px-4 py-3 pl-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Items</th>
                <th className="px-4 py-3 pl-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 pr-10 w-[200px] text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSupplierList.map((supplier) => (
                <React.Fragment key={supplier.id}>
                  <tr 
                    onClick={() => handleRowClick(supplier)} 
                    className={`cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${selectedSupplier?.id === supplier.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{supplier.mrId.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{supplier.supplierName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{supplier.assignedDate}</td>
                    <td className="px-4 py-3 pl-7 whitespace-nowrap">{supplier.totalItems}</td>
                    <td className="px-4 py-3 pl-12 whitespace-nowrap">{supplier.availableItems}</td>
                   <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block min-w-[110px] px-3 py-1 text-center rounded-full text-white text-[12px]
                          ${
                            supplier.status === 'pending'
                              ? 'bg-red-500'
                              : supplier.status === 'in_progress'
                              ? 'bg-orange-500'
                              : supplier.status === 'in_qa'
                              ? 'bg-purple-500'
                              : supplier.status === 'ready'
                              ? 'bg-blue-500'
                              : supplier.status === 'completed'
                              ? 'bg-green-500'
                              : 'bg-gray-500'
                          }
                        `}
                      >
                        {
                          supplier.status === 'pending' ? 'Pending' :
                          supplier.status === 'in_progress' ? 'In Progress' :
                          supplier.status === 'ready' ? 'Ready for QA' :
                          supplier.status === 'in_qa' ? 'In QA' :
                          supplier.status === 'completed' ? 'Completed' :
                          'Pending'
                        }
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {supplier.status === 'ready' && (
                          <button 
                            className="p-1 text-sm rounded bg-blue-100 hover:bg-blue-200 flex items-center text-blue-700"
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              handleSendToQA(supplier.id);
                            }}
                          >
                            <Send size={14} className="mr-1" />
                            <span>Send to QA</span>
                          </button>
                        )}
                        <button 
                          className="p-1 text-sm rounded bg-green-100 hover:bg-green-200 flex items-center text-green-700"
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          <Share size={14} className="mr-1" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {selectedSupplier?.id === supplier.id && (
                    <tr>
                      <td colSpan={7} className="p-0 border-t-0">
                        <div className="p-4 bg-gray-50 animate-fadeIn">
                          <SupplierDetailsView supplier={selectedSupplier} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredSupplierList.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No supplier assignments found. Assign an MR to a supplier to see their status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierStatusPage;