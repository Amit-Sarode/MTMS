import React, { useState, useEffect } from 'react';
import { RefreshCw, Filter, Search, Share, Package, Send, Edit } from 'lucide-react';
import { IMr } from '../../types/mrTypes';
import { generateMockMrData } from '../../utils/mockData';
import MrDetailsView from './MrDetailsView';
import SupplierSelect from '../Supplier/SupplierSelect';
import MrForm from '../MR/MrForm'

interface MrPageProps {
  searchTerm: string;
}

const MrPage: React.FC<MrPageProps> = ({ searchTerm }) => {
  const [mrList, setMrList] = useState<IMr[]>([]);
  const [filteredMrList, setFilteredMrList] = useState<IMr[]>([]);
  const [selectedMr, setSelectedMr] = useState<IMr | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [currentMrId, setCurrentMrId] = useState<string | null>(null);
  const [showMrForm, setShowMrForm] = useState(false);
const [mrToEdit, setMrToEdit] = useState<IMr | null>(null);

  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const mockData = generateMockMrData(5);
      setMrList(mockData);
      setFilteredMrList(mockData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = mrList.filter(mr => 
        mr.bomId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        mr.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMrList(filtered);
    } else {
      setFilteredMrList(mrList);
    }
  }, [searchTerm, mrList]);
  
  const handleRowClick = (mr: IMr) => {
    setSelectedMr(mr.id === selectedMr?.id ? null : mr);
  };
  
  const handleSendToSupplier = (mrId: string) => {
    setCurrentMrId(mrId);
    setShowSupplierModal(true);
  };
  
  const handleSupplierSelect = (supplierId: string) => {
    // In a real app, this would send the MR to the supplier
    console.log(`Sending MR ${currentMrId} to supplier ${supplierId}`);
    
    // Update MR status
    const updatedList = mrList.map(mr => 
      mr.id === currentMrId 
        ? { ...mr, status: 'sent_to_supplier' as IMr['status'], assignedTo: supplierId } 
        : mr
    );
    
    setMrList(updatedList as IMr[]);
    setFilteredMrList(updatedList as IMr[]);
    setShowSupplierModal(false);
    setCurrentMrId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw size={28} className="animate-spin text-[hsl(var(--primary))]" />
      </div>
    );
  }
  const mrEdit = (mr: IMr) => {
  setMrToEdit(mr);
  setShowMrForm(true);
};


  return (
    <div className="bg-white dark:bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Material Requisitions (MR)</h1>
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
            <option value="sent_to_supplier">Sent to Supplier</option>
            <option value="in_qa">In QA</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search MRs..."
            className="pl-10 py-2 border rounded-md focus:ring-primary"
          />
        </div>
      </div>
      
      {/* MR Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 pl-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MR ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 pl-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 pr-[7rem] w-[200px] text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMrList.map((mr) => (
                <React.Fragment key={mr.id}>
                  <tr 
                    onClick={() => handleRowClick(mr)} 
                    className={`cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${selectedMr?.id === mr.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {selectedMr?.id === mr.id ? 
                          <Package size={18} className="text-[hsl(var(--primary))] mr-2" /> : 
                          <Package size={18} className="text-gray-400 mr-2" />
                        }
                        <span>{mr.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 pl-7 whitespace-nowrap font-medium">{mr.clientName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{mr.createdDate}</td>
                    <td className="px-4 py-3 pl-7 whitespace-nowrap">{mr.items.length}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block min-w-[110px] px-3 py-1 text-center rounded-full text-white text-[12px]  
                          ${
                            mr.status === 'pending' ? 'bg-yellow-500' :
                            mr.status === 'sent_to_supplier' ? 'bg-blue-500' :
                            mr.status === 'in_qa' ? 'bg-purple-500' :
                            mr.status === 'completed' ? 'bg-green-500' :
                            mr.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
                          }
                        `}
                      >
                        {mr.status === 'pending' ? 'Pending' :
                        mr.status === 'sent_to_supplier' ? 'With Supplier' :
                        mr.status === 'in_qa' ? 'In QA' :
                        mr.status === 'completed' ? 'Completed' :
                        mr.status === 'rejected' ? 'Rejected' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-1 text-sm rounded bg-gray-100 hover:bg-gray-200 flex items-center"
                         onClick={(e) => {
  e.stopPropagation(); 
  mrEdit(mr);
}}

                        >
                          <Edit size={14} className="mr-1" />
                          <span>Edit</span>
                        </button>

                        {showMrForm && mrToEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Material Requisition</h2>
          <button 
            onClick={() => setShowMrForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <MrForm 
          editData={mrToEdit}
          onSubmit={(updatedMr: IMr) => {
            const updatedList = mrList.map(mr =>
              mr.id === updatedMr.id ? updatedMr : mr
            );
            setMrList(updatedList);
            setFilteredMrList(updatedList);
            setShowMrForm(false);
            setMrToEdit(null);
          }}
          onCancel={() => {
            setShowMrForm(false);
            setMrToEdit(null);
          }}
        />
      </div>
    </div>
  </div>
)}

                        <button 
                          className="p-1 text-sm rounded bg-gray-100 hover:bg-gray-200 flex items-center"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleSendToSupplier(mr.id);
                          }}
                          disabled={mr.status !== 'pending'}
                        >
                          <Send size={14} className="mr-1" />
                          <span>Supplier</span>
                        </button>
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
                  {selectedMr?.id === mr.id && (
                    <tr>
                      <td colSpan={6} className="p-0 border-t-0">
                        <div className="p-4 bg-gray-50 animate-fadeIn">
                          <MrDetailsView mr={selectedMr} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredMrList.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No Material Requisitions found. Create a BOM and select items to generate MRs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Supplier Selection Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Select Supplier</h2>
                <button 
                  onClick={() => setShowSupplierModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <SupplierSelect onSelect={handleSupplierSelect} onCancel={() => setShowSupplierModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MrPage;