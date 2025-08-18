// import React, { useState, useEffect } from 'react';
// import { Plus, Filter, Download, Edit, Trash, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
// import BomForm from './BomForm';
// import { IBom, IStock } from '../../types/bomTypes';
// import { generateMockBomData } from '../../utils/mockData';
// import BomDetailsView from './BomDetailsView';
// // import AddStocks from './AddStocks';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// interface BomPageProps {
//   searchTerm: string;
// }

// const BomPage: React.FC<BomPageProps> = ({ searchTerm }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [bomList, setBomList] = useState<IBom[]>([]);
//   const [filteredBomList, setFilteredBomList] = useState<IBom[]>([]);
//   const [selectedBom, setSelectedBom] = useState<IBom | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   // const [stocks, setStocks] = useState(false);
//   const [stockList, setStockList] = useState<IStock[]>([]);

//   const [bomToEdit, setBomToEdit] = useState<IBom | null>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const mockData = generateMockBomData(8);
//       setBomList(mockData);
//       setFilteredBomList(mockData);
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = bomList.filter(bom =>
//         bom.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         bom.clientContactNumber.includes(searchTerm)
//       );
//       setFilteredBomList(filtered);
//     } else {
//       setFilteredBomList(bomList);
//     }
//   }, [searchTerm, bomList]);

//   const handleCreateOrUpdateBom = (bom: IBom) => {
//     if (bomToEdit) {
//       // Edit existing BOM
//       const updatedList = bomList.map(b => (b.id === bom.id ? bom : b));
//       setBomList(updatedList);
//       setFilteredBomList(updatedList);
//     } else {
//       // Create new BOM
//       const updatedList = [bom, ...bomList];
//       setBomList(updatedList);
//       setFilteredBomList(updatedList);
//     }
//     setShowForm(false);
//     setBomToEdit(null);
//   };

//   const handleDeleteBom = (bomId: string) => {
//     const updatedList = bomList.filter(bom => bom.id !== bomId);
//     setBomList(updatedList);
//     setFilteredBomList(updatedList);
//     if (selectedBom?.id === bomId) {
//       setSelectedBom(null);
//     }
//   };

//   const handleExportToExcel = () => {
//     const exportData = filteredBomList.map(bom => ({
//       'Client Name': bom.clientName,
//       'Contact Number': bom.clientContactNumber,
//       'Created Date': bom.createdDate,
//       'Expected Date': bom.expectedDate,
//       'Number of Items': bom.items.length,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'BOM Data');

//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     saveAs(blob, 'bom-data.xlsx');
//   };

//   const handleRowClick = (bom: IBom) => {
//     setSelectedBom(bom.id === selectedBom?.id ? null : bom);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <RefreshCw size={28} className="animate-spin text-[hsl(var(--primary))]" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Bill of Materials (BOM)</h1>
//         <div className="flex gap-3">
//           <button
//             onClick={() => {
//               setBomToEdit(null);
//               setShowForm(true);
//             }}
//             className="primary flex items-center space-x-2"
//           >
//             <Plus size={18} />
//             <span>Create New BOM</span>
//           </button>
//           {/* <button
//             onClick={() => setStocks(true)}
//             className="primary flex items-center space-x-2"
//           >
//             <Plus size={18} />
//             <span>Add New Stock</span>
//           </button> */}
//         </div>
//       </div>

//       {/* Table Actions */}
//       <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex items-center space-x-2">
//           <button className="secondary flex items-center space-x-2 text-sm">
//             <Filter size={16} />
//             <span>Filter</span>
//           </button>
//           <button
//             onClick={handleExportToExcel}
//             className="secondary flex items-center space-x-2 text-sm"
//           >
//             <Download size={16} />
//             <span>Export</span>
//           </button>
//         </div>
//       </div>

//       {/* BOM Table */}
//       <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Date</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                 <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredBomList.map((bom) => (
//                 <React.Fragment key={bom.id}>
//                   <tr
//                     onClick={() => handleRowClick(bom)}
//                     className={`cursor-pointer hover:bg-gray-50 ${selectedBom?.id === bom.id ? 'bg-blue-50' : ''}`}
//                   >
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {selectedBom?.id === bom.id ?
//                           <ChevronDown size={18} className="text-[hsl(var(--primary))] mr-2" /> :
//                           <ChevronRight size={18} className="text-gray-400 mr-2" />
//                         }
//                         <span className="font-medium">{bom.clientName}</span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">{bom.clientContactNumber}</td>
//                     <td className="px-4 py-3">{bom.createdDate}</td>
//                     <td className="px-4 py-3">{bom.expectedDate}</td>
//                     <td className="px-4 py-3 pl-7">{bom.items.length}</td>
//                     <td className="px-4 py-3 text-right">
//                       <div className="flex justify-end space-x-2">
//                         <button
//                           className="p-1 rounded hover:bg-gray-100 text-blue-600"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setBomToEdit(bom);
//                             setShowForm(true);
//                           }}
//                         >
//                           <Edit size={18} />
//                         </button>
//                         <button
//                           className="p-1 rounded hover:bg-gray-100 text-red-600"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteBom(bom.id);
//                           }}
//                         >
//                           <Trash size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                   {selectedBom?.id === bom.id && (
//                     <tr>
//                       <td colSpan={6} className="p-0 border-t-0">
//                         <div className="p-4 bg-gray-50">
//                           <BomDetailsView bom={selectedBom} />
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//               {filteredBomList.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
//                     No BOMs found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* BOM Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">
//                   {bomToEdit ? 'Edit BOM' : 'Create New BOM'}
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowForm(false);
//                     setBomToEdit(null);
//                   }}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <BomForm
//                 editData={bomToEdit ?? undefined}
//                 onSubmit={handleCreateOrUpdateBom}
//                 onCancel={() => {
//                   setShowForm(false);
//                   setBomToEdit(null);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Stocks Modal */}
//       {/* {stocks && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Add New Stocks</h2>
//                 <button onClick={() => setStocks(false)} className="text-gray-500 hover:text-gray-700">
//                   &times;
//                 </button>
//               </div>
//               <AddStocks
//                 onSubmit={(newStock) => {
//                   setStockList(prev => [newStock, ...prev]);
//                   setStocks(false);
//                 }}
//                 onCancel={() => setStocks(false)}
//               />
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* Recently Added Stocks */}
//       {stockList.length > 0 && (
//         <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-200 p-4">
//           <h2 className="text-lg font-semibold mb-4">Recently Added Stocks</h2>
//           <ul className="space-y-2">
//             {stockList.map(stock => (
//               <li key={stock.id} className="border-b pb-2 last:border-none">
//                 <div className="flex justify-between">
//                   <span className="font-medium">{stock.stockName}</span>
//                   <span className="text-sm text-gray-500">ID: {stock.stockId}</span>
//                 </div>
//                 <div className="text-sm text-gray-600">Items: {stock.items.length}</div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BomPage;



import React, { useState, useEffect } from 'react';
import { Plus, Filter, Download, Edit, Trash, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import BomForm from './BomForm';
import { IBom, IStock } from '../../types/bomTypes';
import { generateMockBomData } from '../../utils/mockData';
import BomDetailsView from './BomDetailsView';
// import AddStocks from './AddStocks';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface BomPageProps {
  searchTerm: string;
}

const BomPage: React.FC<BomPageProps> = ({ searchTerm }) => {
  const [showForm, setShowForm] = useState(false);
  const [bomList, setBomList] = useState<IBom[]>([]);
  const [filteredBomList, setFilteredBomList] = useState<IBom[]>([]);
  const [selectedBom, setSelectedBom] = useState<IBom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stockList, setStockList] = useState<IStock[]>([]);

  const [bomToEdit, setBomToEdit] = useState<IBom | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockData = generateMockBomData(8);
      setBomList(mockData);
      setFilteredBomList(mockData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = bomList.filter(bom =>
        bom.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bom.clientContactNumber.includes(searchTerm)
      );
      setFilteredBomList(filtered);
    } else {
      setFilteredBomList(bomList);
    }
  }, [searchTerm, bomList]);

  const handleCreateOrUpdateBom = (bom: IBom) => {
    if (bomToEdit) {
      // Edit existing BOM
      const updatedList = bomList.map(b => (b.id === bom.id ? bom : b));
      setBomList(updatedList);
      setFilteredBomList(updatedList);
    } else {
      // Create new BOM
      const updatedList = [bom, ...bomList];
      setBomList(updatedList);
      setFilteredBomList(updatedList);
    }
    setShowForm(false);
    setBomToEdit(null);
  };

  const handleDeleteBom = (bomId: string) => {
    const updatedList = bomList.filter(bom => bom.id !== bomId);
    setBomList(updatedList);
    setFilteredBomList(updatedList);
    if (selectedBom?.id === bomId) {
      setSelectedBom(null);
    }
  };

  const handleExportToExcel = () => {
    const exportData = filteredBomList.map(bom => ({
      'Client Name': bom.clientName,
      'Contact Number': bom.clientContactNumber,
      'Created Date': bom.createdDate,
      'Expected Date': bom.expectedDate,
      'Number of Items': bom.items.length,
    }));

    // This part requires the 'xlsx' library, which isn't directly available in this environment.
    // For a real application, you'd import and use it like this:
    // const worksheet = XLSX.utils.json_to_sheet(exportData);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'BOM Data');
    // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    // saveAs(blob, 'bom-data.xlsx');

    // For demonstration, we'll just log a message.
    console.log("Export to Excel functionality triggered. (Requires 'xlsx' and 'file-saver' libraries)");
    alert("Export to Excel functionality triggered. (Requires 'xlsx' and 'file-saver' libraries to be installed in your project)");
  };

  const handleRowClick = (bom: IBom) => {
    setSelectedBom(bom.id === selectedBom?.id ? null : bom);
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
        <h1 className="text-2xl font-bold">Bill of Materials (BOM)</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setBomToEdit(null);
              setShowForm(true);
            }}
            className="primary flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Create New BOM</span>
          </button>
        </div>
      </div>

      {/* Table Actions */}
      <div className="bg-white dark:bg-gray-800 p-4 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"  >
        <div className="bg-white dark:bg-gray-800 p-4">

        <div className="flex items-center space-x-2">
          <button className="bg-white dark:bg-gray-800 dark:hover:bg-gray-700 secondary flex items-center space-x-2 text-sm text-black dark:text-white">
            <Filter size={16} />
            <span bg-white dark:bg-gray-800 p-4 text-black dark:text-white>Filter</span>
          </button>
          <button
            onClick={handleExportToExcel}
            className="bg-white dark:bg-gray-800 dark:hover:bg-gray-700  secondary flex items-center space-x-2 text-sm text-black dark:text-white"
          >
            <Download size={16} />
            <span bg-white dark:bg-gray-800 text-white p-4 text-black dark:text-white>Export</span>
          </button>
        </div>
        </div>
      </div>

      {/* BOM Table */}
      <div className="bg-white dark:bg-gray-800 p-4  rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-white dark:bg-gray-800 p-4">

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBomList.map((bom) => (
                <React.Fragment key={bom.id}>
                  <tr
                    onClick={() => handleRowClick(bom)}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedBom?.id === bom.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {selectedBom?.id === bom.id ?
                          <ChevronDown size={18} className="text-[hsl(var(--primary))] mr-2" /> :
                          <ChevronRight size={18} className="text-gray-400 mr-2" />
                        }
                        <span className="font-medium">{bom.clientName}</span>
                      </div>
                      
                    </td>
                    
                    <td className="px-4 py-3">{bom.clientContactNumber}</td>
                    <td className="px-4 py-3">{bom.createdDate}</td>
                    <td className="px-4 py-3">{bom.expectedDate}</td>
                    <td className="px-4 py-3 pl-7">{bom.items.length}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 rounded hover:bg-gray-100 text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setBomToEdit(bom);
                            setShowForm(true);
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-100 text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBom(bom.id);
                          }}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {selectedBom?.id === bom.id && (
                    <tr>
                      <td colSpan={6} className="p-0 border-t-0">
                        <div className="p-4 bg-white dark:bg-gray-800 p-4">
                          <BomDetailsView bom={selectedBom} />
                        </div>
                      </td>
                      
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredBomList.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No BOMs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* BOM Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {bomToEdit ? 'Edit BOM' : 'Create New BOM'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setBomToEdit(null);
                  }}
                  className="text-gray-900 dark:text-gray-100 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <BomForm
                // editData={bomToEdit ?? undefined}
                onSubmit={handleCreateOrUpdateBom}
                onCancel={() => {
                  setShowForm(false);
                  setBomToEdit(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Recently Added Stocks */}
      {stockList.length > 0 && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Recently Added Stocks</h2>
          <ul className="space-y-2">
            {stockList.map(stock => (
              <li key={stock.id} className="border-b pb-2 last:border-none">
                <div className="flex justify-between">
                  <span className="font-medium">{stock.stockName}</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">ID: {stock.stockId}</span>
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">Items: {stock.items.length}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BomPage