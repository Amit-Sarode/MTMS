import React, { useState, useEffect } from 'react';
import { RefreshCw, Filter, Search, CheckCircle, XCircle } from 'lucide-react';
import { IQaStatus } from '../../types/qaTypes';
import { generateMockQaData } from '../../utils/mockData';
import QaDetailsView from './QaDetailsView';

interface QaStatusPageProps {
  searchTerm: string;
}

const QaStatusPage: React.FC<QaStatusPageProps> = ({ searchTerm }) => {
  const [qaList, setQaList] = useState<IQaStatus[]>([]);
  const [filteredQaList, setFilteredQaList] = useState<IQaStatus[]>([]);
  const [selectedQa, setSelectedQa] = useState<IQaStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const mockData = generateMockQaData(5);
      setQaList(mockData);
      setFilteredQaList(mockData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = qaList.filter(qa => 
        qa.mrId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        qa.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQaList(filtered);
    } else {
      setFilteredQaList(qaList);
    }
  }, [searchTerm, qaList]);
  
  const handleRowClick = (qa: IQaStatus) => {
    setSelectedQa(qa.id === selectedQa?.id ? null : qa);
  };
  
  const handleApprove = (qaId: string) => {
    // In a real app, this would approve the QA check
    const updatedList = qaList.map(qa => 
      qa.id === qaId 
        ? { ...qa, status: 'approved' } 
        : qa
    );
    
    setQaList(updatedList);
    setFilteredQaList(updatedList);
  };
  
  const handleReject = (qaId: string) => {
    // In a real app, this would reject the QA check
    const updatedList = qaList.map(qa => 
      qa.id === qaId 
        ? { ...qa, status: 'rejected' } 
        : qa
    );
    
    setQaList(updatedList);
    setFilteredQaList(updatedList);
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
        <h1 className="text-2xl font-bold">QA Status</h1>
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search QA checks..."
            className="pl-10 py-2 border rounded-md focus:ring-primary"
          />
        </div>
      </div>
      
      {/* QA Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 pl-7 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MR ID</th>
                <th className="px-4 py-3 pl-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passed Items</th>
                <th className="px-4 py-3 pl-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 pr-12 w-[200px] text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQaList.map((qa) => (
                <React.Fragment key={qa.id}>
                  <tr 
                    onClick={() => handleRowClick(qa)} 
                    className={`cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${selectedQa?.id === qa.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{qa.mrId.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{qa.supplierName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{qa.receivedDate}</td>
                    <td className="px-4 py-3 pl-7 whitespace-nowrap">{qa.totalItems}</td>
                    <td className="px-4 py-3 pl-12 whitespace-nowrap">{qa.passedItems}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block min-w-[110px] px-3 py-1 text-center rounded-full text-white text-[12px]
                           ${
                            qa.status === 'pending'
                              ? 'bg-yellow-500'
                              : qa.status === 'in_progress'
                              ? 'bg-orange-500'
                              : qa.status === 'approved'
                              ? 'bg-green-500'
                              : qa.status === 'rejected'
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                          }
                        `}
                      >
                        {
                          qa.status === 'pending' ? 'Pending' :
                          qa.status === 'in_progress' ? 'In Progress' :
                          qa.status === 'approved' ? 'Approved' :
                          qa.status === 'rejected' ? 'Rejected' :
                          'Unknown'
                        }
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {(qa.status === 'pending' || qa.status === 'in_progress') && (
                          <>
                            <button 
                              className="p-1 text-sm rounded bg-green-100 hover:bg-green-200 flex items-center text-green-700"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                handleApprove(qa.id);
                              }}
                            >
                              <CheckCircle size={14} className="mr-1" />
                              <span>Approve</span>
                            </button>
                            <button 
                              className="p-1 text-sm rounded bg-red-100 hover:bg-red-200 flex items-center text-red-700"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                handleReject(qa.id);
                              }}
                            >
                              <XCircle size={14} className="mr-1" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  {selectedQa?.id === qa.id && (
                    <tr>
                      <td colSpan={7} className="p-0 border-t-0">
                        <div className="p-4 bg-gray-50 animate-fadeIn">
                          <QaDetailsView qa={selectedQa} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredQaList.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No QA checks found. Items must be received from suppliers first.
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

export default QaStatusPage;