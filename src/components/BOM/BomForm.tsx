// import React, { useState } from 'react';
// import { IBom, BomItem } from '../../types/bomTypes';
// import { Plus, X, Save } from 'lucide-react';
// import { generateId } from '../../utils/helpers';

// interface BomFormProps {
//   onSubmit: (bom: IBom) => void;
//   onCancel: () => void;
//   editData?: IBom;
// }


// const BomForm: React.FC<BomFormProps> = ({ onSubmit, onCancel, editData }) => {
//   const [clientName, setClientName] = useState(editData?.clientName || '');
//   const [clientContactNumber, setClientContactNumber] = useState(editData?.clientContactNumber || '');
//   const [createdDate, setCreatedDate] = useState(editData?.createdDate || new Date().toISOString().split('T')[0]);
//   const [expectedDate, setExpectedDate] = useState(editData?.expectedDate || '');

//   const [items, setItems] = useState<BomItem[]>(editData?.items || [
//     {
//       id: generateId(),
//       itemName: '',
//       itemCode: '',
//       drawingUrl: '',
//       size: '',
//       quantity: 1,
//       unit: 'nos',
//       weight: '',
//       inStock: false,
//       createdDate: new Date().toISOString().split('T')[0],
//       expectedDeliveryDate: ''
//     }
//   ]);

//   const [formErrors, setFormErrors] = useState({
//     clientName: false,
//     clientContactNumber: false,
//     expectedDate: false,
//     items: false
//   });

//   const handleAddItem = () => {
//     const newItem: BomItem = {
//       id: generateId(),
//       itemName: '',
//       itemCode: '',
//       drawingUrl: '',
//       size: '',
//       quantity: 1,
//       unit: 'nos',
//       weight: '',
//       inStock: false,
//       createdDate: new Date().toISOString().split('T')[0],
//       expectedDeliveryDate: ''
//     };

//     setItems([...items, newItem]);
//   };

//   const handleRemoveItem = (id: string) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   const handleItemChange = (id: string, field: keyof BomItem, value: any) => {
//     setItems(items.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const validateForm = () => {
//     const isValidPhoneNumber = (phone: string) => /^\d{10}$/.test(phone);
//     const errors = {
//       clientName: !clientName,

//       clientContactNumber: !isValidPhoneNumber(clientContactNumber),
//       expectedDate: !expectedDate,
//       items: items.some(item => !item.itemName || !item.itemCode)
//     };

//     setFormErrors(errors);

//     return !Object.values(errors).some(error => error);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const newBom: IBom = {
//       id: editData?.id || generateId(),
//       clientName,
//       clientContactNumber,
//       createdDate,
//       expectedDate,
//       items
//     };

//     onSubmit(newBom);
//   };
//   const isFormValid = 
//     clientName.trim() !== '' &&
//     clientContactNumber.trim() !== '' &&
//     expectedDate.trim() !== '' &&
//     items.every(item => item.itemName.trim() !== '' && item.itemCode.trim() !== '');

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Client Name*
//           </label>
//           <input 
//             type="text" 
//             value={clientName}
//             onChange={(e) => setClientName(e.target.value)}
//             className={`w-full ${formErrors.clientName ? 'border-red-500 ring-red-500' : ''}`}
//           />
//           {formErrors.clientName && (
//             <p className="text-red-500 text-xs mt-1">Client name is required</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Client Contact Number*
//           </label>
//           <input 
//             type="text" 
//             value={clientContactNumber}
//             onChange={(e) => setClientContactNumber(e.target.value)}
//             className={`w-full ${formErrors.clientContactNumber ? 'border-red-500 ring-red-500' : ''}`}
//           />
//           {formErrors.clientContactNumber && (
//             <p className="text-red-500 text-xs mt-1">Contact number is required</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Created Date
//           </label>
//           <input 
//             type="date" 
//             value={createdDate}
//             onChange={(e) => setCreatedDate(e.target.value)}
//             className="w-full cursor-not-allowed"
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Expected Date*
//           </label>
//           <input 
//             type="date" 
//             value={expectedDate}
//             onChange={(e) => setExpectedDate(e.target.value)}
//             className={`w-full ${formErrors.expectedDate ? 'border-red-500 ring-red-500' : ''}`}
//             min={new Date().toISOString().split('T')[0]}
//           />
//           {formErrors.expectedDate && (
//             <p className="text-red-500 text-xs mt-1">Expected date is required</p>
//           )}
//         </div>
//       </div>

//       <div className="border-t border-gray-200 pt-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium">Items</h3>
//           <button 
//             type="button"
//             onClick={handleAddItem}
//             className="flex items-center space-x-1 text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-light))]"
//           >
//             <Plus size={16} />
//             <span>Add Item</span>
//           </button>
//         </div>

//         {formErrors.items && (
//           <p className="text-red-500 text-sm mb-4">Please complete all required item fields</p>
//         )}

//         <div className="space-y-6">
//           {items.map((item, index) => (
//             <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
//               <button 
//                 type="button"
//                 onClick={() => handleRemoveItem(item.id)}
//                 className={`absolute top-2 right-2 p-1 ${
//                   items.length === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-red-500'
//                 }`}
//                 disabled={items.length === 1}
//               >
//                 <X size={18} />
//               </button>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Item Name*
//                   </label>
//                   <input 
//                     type="text" 
//                     value={item.itemName}
//                     onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
//                     className={`w-full ${!item.itemName && formErrors.items ? 'border-red-500 ring-red-500' : ''}`}
//                     placeholder="Enter item name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Item Code*
//                   </label>
//                   <input 
//                     type="text" 
//                     value={item.itemCode}
//                     onChange={(e) => handleItemChange(item.id, 'itemCode', e.target.value)}
//                     className={`w-full ${!item.itemCode && formErrors.items ? 'border-red-500 ring-red-500' : ''}`}
//                     placeholder="Enter item code"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Drawing Upload
//                   </label>
//                   <input 
//                     type="text" 
//                     value={item.drawingUrl}
//                     onChange={(e) => handleItemChange(item.id, 'drawingUrl', e.target.value)}
//                     className="w-full"
//                     placeholder="URL to drawing"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Size
//                   </label>
//                   <input 
//                     type="text" 
//                     value={item.size}
//                     onChange={(e) => handleItemChange(item.id, 'size', e.target.value)}
//                     className="w-full"
//                     placeholder="Enter size"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Quantity
//                   </label>
//                   <input 
//                     type="number" 
//                     value={item.quantity}
//                     onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
//                     className="w-full"
//                     min="1"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Unit
//                   </label>
//                   <select 
//                     value={item.unit}
//                     onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
//                     className="w-full"
//                   >
//                     <option value="nos">Nos</option>
//                     <option value="meter">Meter</option>
//                     <option value="kg">KG</option>
//                     <option value="custom">Custom</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Weight
//                   </label>
//                   <input 
//                     type="text" 
//                     value={item.weight}
//                     onChange={(e) => handleItemChange(item.id, 'weight', e.target.value)}
//                     className="w-full"
//                     placeholder="Enter weight"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Expected Delivery Date
//                   </label>
//                   <input 
//                     type="date" 
//                     value={item.expectedDeliveryDate}
//                     onChange={(e) => handleItemChange(item.id, 'expectedDeliveryDate', e.target.value)}
//                     className="w-full"
//                   />
//                 </div>

//                 <div className="flex items-center pt-6">
//                   <input 
//                     type="checkbox" 
//                     id={`inStock-${item.id}`}
//                     checked={item.inStock}
//                     onChange={(e) => handleItemChange(item.id, 'inStock', e.target.checked)}
//                     className="h-4 w-4 text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
//                   />
//                   <label htmlFor={`inStock-${item.id}`} className="ml-2 text-sm text-gray-700">
//                     Item in stock
//                   </label>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
//         <button 
//           type="button" 
//           onClick={onCancel}
//           className="secondary"
//         >
//           Cancel
//         </button>
//         <button 
//           type="submit" 
//           className={`primary flex items-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={!isFormValid}
//         >
//           <Save size={18} className="mr-2" />
//           {editData ? 'Update BOM' : 'Create BOM'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BomForm;



import React, { useState } from 'react';
// import { IBom, BomItem } from '../../types/bomTypes';
import { Plus, X, Save } from 'lucide-react';
// import { generateId } from '../../utils/helpers';
interface BomItem {
  id: string;
  itemName: string;
  itemCode: string;
  drawingUrl: string;
  size: string;
  quantity: number;
  unit: string;
  weight: string;
  inStock: boolean;
  createdDate: string;
  expectedDeliveryDate: string;
}

interface IBom {
  id: string;
  clientName: string;
  clientContactNumber: string;
  createdDate: string;
  expectedDate: string;
  items: BomItem[];
}

interface IStock {
  id: string;
  stockName: string;
  stockId: string;
  items: BomItem[]; // Simplified for mock data
}

const generateId = (): string => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const generateMockBomData = (count: number): IBom[] => {
  const data: IBom[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: generateId(),
      clientName: `Client ${i + 1}`,
      clientContactNumber: `987654321${i}`,
      createdDate: `2023-0${(i % 9) + 1}-15`,
      expectedDate: `2024-0${(i % 9) + 1}-20`,
      items: [
        {
          id: generateId(),
          itemName: `Item A${i + 1}`,
          itemCode: `CODE-A${i + 1}`,
          drawingUrl: i % 2 === 0 ? 'https://example.com/drawingA.pdf' : '',
          size: '10x10',
          quantity: 5,
          unit: 'nos',
          weight: '100kg',
          inStock: i % 3 === 0,
          createdDate: `2023-0${(i % 9) + 1}-10`,
          expectedDeliveryDate: `2024-0${(i % 9) + 1}-18`,
        },
        {
          id: generateId(),
          itemName: `Item B${i + 1}`,
          itemCode: `CODE-B${i + 1}`,
          drawingUrl: i % 2 !== 0 ? 'https://example.com/drawingB.pdf' : '',
          size: '20x20',
          quantity: 2,
          unit: 'meter',
          weight: '50kg',
          inStock: i % 3 !== 0,
          createdDate: `2023-0${(i % 9) + 1}-12`,
          expectedDeliveryDate: `2024-0${(i % 9) + 1}-25`,
        },
      ],
    });
  }
  return data;
};

// --- BomForm Component ---
interface BomFormProps {
  onSubmit: (bom: IBom) => void;
  onCancel: () => void;
  editData?: IBom;
}

const BomForm: React.FC<BomFormProps> = ({ onSubmit, onCancel, editData }) => {
  const [clientName, setClientName] = useState(editData?.clientName || '');
  const [clientContactNumber, setClientContactNumber] = useState(editData?.clientContactNumber || '');
  const [createdDate, setCreatedDate] = useState(editData?.createdDate || new Date().toISOString().split('T')[0]);
  const [expectedDate, setExpectedDate] = useState(editData?.expectedDate || '');

  const [items, setItems] = useState<BomItem[]>(editData?.items || [
    {
      id: generateId(),
      itemName: '',
      itemCode: '',
      drawingUrl: '',
      size: '',
      quantity: 1,
      unit: 'nos',
      weight: '',
      inStock: false,
      createdDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: ''
    }
  ]);

  const [formErrors, setFormErrors] = useState({
    clientName: false,
    clientContactNumber: false,
    expectedDate: false,
    items: false
  });

  const handleAddItem = () => {
    const newItem: BomItem = {
      id: generateId(),
      itemName: '',
      itemCode: '',
      drawingUrl: '',
      size: '',
      quantity: 1,
      unit: 'nos',
      weight: '',
      inStock: false,
      createdDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: ''
    };

    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof BomItem, value: any) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const validateForm = () => {
    const isValidPhoneNumber = (phone: string) => /^\d{10}$/.test(phone);
    const errors = {
      clientName: !clientName,
      clientContactNumber: !isValidPhoneNumber(clientContactNumber),
      expectedDate: !expectedDate,
      items: items.some(item => !item.itemName || !item.itemCode)
    };

    setFormErrors(errors);

    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBom: IBom = {
      id: editData?.id || generateId(),
      clientName,
      clientContactNumber,
      createdDate,
      expectedDate,
      items
    };

    onSubmit(newBom);
  };
  const isFormValid =
    clientName.trim() !== '' &&
    clientContactNumber.trim() !== '' &&
    expectedDate.trim() !== '' &&
    items.every(item => item.itemName.trim() !== '' && item.itemCode.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name*
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={`w-full ${formErrors.clientName ? 'border-red-500 ring-red-500' : ''}`}
          />
          {formErrors.clientName && (
            <p className="text-red-500 text-xs mt-1">Client name is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Contact Number*
          </label>
          <input
            type="text"
            value={clientContactNumber}
            onChange={(e) => setClientContactNumber(e.target.value)}
            className={`w-full ${formErrors.clientContactNumber ? 'border-red-500 ring-red-500' : ''}`}
          />
          {formErrors.clientContactNumber && (
            <p className="text-red-500 text-xs mt-1">Contact number is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Created Date
          </label>
          <input
            type="date"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            className="w-full cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Date*
          </label>
          <input
            type="date"
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
            className={`w-full ${formErrors.expectedDate ? 'border-red-500 ring-red-500' : ''}`}
            min={new Date().toISOString().split('T')[0]}
          />
          {formErrors.expectedDate && (
            <p className="text-red-500 text-xs mt-1">Expected date is required</p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Items</h3>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center space-x-1 text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-light))]"
          >
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        </div>

        {formErrors.items && (
          <p className="text-red-500 text-sm mb-4">Please complete all required item fields</p>
        )}

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className={`absolute top-2 right-2 p-1 ${items.length === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-red-500'
                  }`}
                disabled={items.length === 1}
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name*
                  </label>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                    className={`w-full ${!item.itemName && formErrors.items ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Code*
                  </label>
                  <input
                    type="text"
                    value={item.itemCode}
                    onChange={(e) => handleItemChange(item.id, 'itemCode', e.target.value)}
                    className={`w-full ${!item.itemCode && formErrors.items ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder="Enter item code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drawing Upload
                  </label>
                  <input
                    type="text"
                    value={item.drawingUrl}
                    onChange={(e) => handleItemChange(item.id, 'drawingUrl', e.target.value)}
                    className="w-full"
                    placeholder="URL to drawing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={item.size}
                    onChange={(e) => handleItemChange(item.id, 'size', e.target.value)}
                    className="w-full"
                    placeholder="Enter size"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                    className="w-full"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={item.unit}
                    onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                    className="w-full"
                  >
                    <option value="nos">Nos</option>
                    <option value="meter">Meter</option>
                    <option value="kg">KG</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={item.weight}
                    onChange={(e) => handleItemChange(item.id, 'weight', e.target.value)}
                    className="w-full"
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    value={item.expectedDeliveryDate}
                    onChange={(e) => handleItemChange(item.id, 'expectedDeliveryDate', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id={`inStock-${item.id}`}
                    checked={item.inStock}
                    onChange={(e) => handleItemChange(item.id, 'inStock', e.target.checked)}
                    className="h-4 w-4 text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                  />
                  <label htmlFor={`inStock-${item.id}`} className="ml-2 text-sm text-gray-700">
                    Item in stock
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`primary flex items-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormValid}
        >
          <Save size={18} className="mr-2" />
          {editData ? 'Update BOM' : 'Create BOM'}
        </button>
      </div>
    </form>
  );
};


export default BomForm