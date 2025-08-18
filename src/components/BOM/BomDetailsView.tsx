// import React from 'react';
// import { IBom } from '../../types/bomTypes';
// import { Edit, ArrowRightCircle, FileText } from 'lucide-react';

// interface BomDetailsViewProps {
//   bom: IBom;
// }

// const BomDetailsView: React.FC<BomDetailsViewProps> = ({ bom }) => {
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-wrap justify-between items-center">
//         <div>
//           <h3 className="text-lg font-semibold">BOM Details: {bom.clientName}</h3>
//           <p className="text-sm text-gray-500">Created on {bom.createdDate}</p>
//         </div>

//         <div className="flex space-x-2">
//           <button className="secondary text-sm flex items-center">
//             <Edit size={16} className="mr-1" />
//             Edit
//           </button>
//           <button className="primary text-sm flex items-center">
//             <ArrowRightCircle size={16} className="mr-1" />
//             Send to MR
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50">
//           <div>
//             <p className="text-sm text-gray-500">Client Name</p>
//             <p className="font-medium">{bom.clientName}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Contact Number</p>
//             <p className="font-medium">{bom.clientContactNumber}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Created Date</p>
//             <p className="font-medium">{bom.createdDate}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Expected Date</p>
//             <p className="font-medium">{bom.expectedDate}</p>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drawing</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
//                 <th className="px-4 py-3 pl-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {bom.items.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <input 
//                       type="checkbox"
//                       checked={item.inStock}
//                       className="h-4 w-4 text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium">{item.itemName}</td>
//                   <td className="px-4 py-3 whitespace-nowrap">{item.itemCode}</td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     {item.drawingUrl ? (
//                       <a 
//                         href={item.drawingUrl} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-[hsl(var(--primary))] hover:underline flex items-center"
//                       >
//                         <FileText size={16} className="mr-1" />
//                         View
//                       </a>
//                     ) : (
//                       <span className="text-gray-400">No drawing</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">{item.size || '-'}</td>
//                   <td className="px-4 py-3 pl-10 whitespace-nowrap">{item.quantity}</td>
//                   <td className="px-4 py-3 whitespace-nowrap">{item.unit}</td>
//                   <td className="px-4 py-3 whitespace-nowrap">{item.weight || '-'}</td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={`inline-block min-w-[100px] px-3 py-1 text-center rounded-full text-white text-[10px] font-medium
//                         ${item.inStock ? 'bg-green-500' : 'bg-yellow-500'}
//                       `}
//                     >
//                       {item.inStock ? 'In Stock' : 'Needed'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BomDetailsView;


import React from 'react';
import { IBom } from '../../types/bomTypes';
import { Edit, ArrowRightCircle, FileText } from 'lucide-react';
interface BomDetailsViewProps {
  bom: IBom;
}

const BomDetailsView: React.FC<BomDetailsViewProps> = ({ bom }) => {
  return (
    <div className=" bg-white dark:bg-gray-800 p-4 space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">BOM Details: {bom.clientName}</h3>
          <p className="text-sm text-gray-900 dark:text-gray-100">Created on {bom.createdDate}</p>
        </div>

        <div className="flex space-x-2">
          <button className="secondary text-sm flex items-center">
            <Edit size={16} className="mr-1" />
            Edit
          </button>
          <button className="primary text-sm flex items-center">
            <ArrowRightCircle size={16} className="mr-1" />
            Send to MR
          </button>
        </div>
      </div>

      <div className="text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-white dark:bg-gray-800 p-4">
          <div>
            <p className="text-sm text-gray-500">Client Name</p>
            <p className="font-medium">{bom.clientName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="font-medium">{bom.clientContactNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created Date</p>
            <p className="font-medium">{bom.createdDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expected Date</p>
            <p className="font-medium">{bom.expectedDate}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white dark:bg-gray-800 p-4">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drawing</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-4 py-3 pl-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bom.items.map((item) => (
                <tr key={item.id} className="hover:bg-white dark:bg-gray-800 p-4">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={item.inStock}
                      className="h-4 w-4 text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">{item.itemName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.itemCode}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.drawingUrl ? (
                      <a
                        href={item.drawingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--primary))] hover:underline flex items-center"
                      >
                        <FileText size={16} className="mr-1" />
                        View
                      </a>
                    ) : (
                      <span className="text-gray-900 dark:text-gray-100">No drawing</span>
                    )}
                  </td>
                  <td className="bg-white dark:bg-gray-800 p-4 px-4 py-3 whitespace-nowrap">{item.size || '-'}</td>
                  <td className="px-4 py-3 pl-10 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.unit}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.weight || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block min-w-[100px] px-3 py-1 text-center rounded-full text-white text-[10px] font-medium
                        ${item.inStock ? 'bg-green-500' : 'bg-yellow-500'}
                      `}
                    >
                      {item.inStock ? 'In Stock' : 'Needed'}
                    </span>
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

export default BomDetailsView