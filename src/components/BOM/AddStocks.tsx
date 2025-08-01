import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { IStock, StockItem } from '../../types/bomTypes';
import { generateId } from '../../utils/helpers';

interface AddStocksProps {
  onSubmit: (stock: IStock) => void;
  onCancel: () => void;
  editData?: IStock;
}



const AddStocks: React.FC<AddStocksProps> = ({ onSubmit, onCancel, editData }) => {
  const [stockName, setStockName] = useState(editData?.stockName || '');
  const [stockId, setStockId] = useState(editData?.stockId || '');
  const [createdDate] = useState(new Date().toISOString().split('T')[0]);

  const [items, setItems] = useState<StockItem[]>(editData?.items || [
    {
      id: generateId(),
      itemName: '',
      itemCode: '',
      quantity: 1,
      unit: 'nos',
      weight: '',
      inStock: false,
      expectedDeliveryDate: ''
    }
  ]);

  const [formErrors, setFormErrors] = useState({
    stockName: false,
    stockId: false,
    items: false
  });

  const handleAddItem = () => {
    const newItem: StockItem = {
      id: generateId(),
      itemName: '',
      itemCode: '',
      quantity: 1,
      unit: 'nos',
      weight: '',
      inStock: false,
      expectedDeliveryDate: ''
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof StockItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const validateForm = () => {
    const errors = {
      stockName: !stockName,
      stockId: !stockId,
      items: items.some(item => !item.itemName || !item.itemCode)
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newStock: IStock = {
      id: editData?.id || generateId(),
      stockName,
      stockId,
      createdDate,
      items
    };
    onSubmit(newStock);
  };
const isFormValid =
  stockName.trim() !== '' &&
  stockId.trim() !== '' &&
  items.length > 0 &&
  items.every(item => item.itemName.trim() !== '' && item.itemCode.trim() !== '');


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Stock Name*</label>
          <input
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            className={`w-full ${formErrors.stockName ? 'border-red-500 ring-red-500' : ''}`}
          />
          {formErrors.stockName && <p className="text-red-500 text-xs">Stock name is required</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Code*</label>
          <input
            type="text"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
            className={`w-full ${formErrors.stockId ? 'border-red-500 ring-red-500' : ''}`}
          />
          {formErrors.stockId && <p className="text-red-500 text-xs">Stock Code is required</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Created Date</label>
          <input type="date" value={createdDate} readOnly className="w-full" />
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Items</h3>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center text-sm text-[hsl(var(--primary))]"
          >
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        </div>

        {formErrors.items && (
          <p className="text-red-500 text-sm mb-4">Please complete all required item fields</p>
        )}

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg bg-gray-50 relative">
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
                disabled={items.length === 1}
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Item Name*</label>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                    className={`w-full ${!item.itemName && formErrors.items ? 'border-red-500 ring-red-500' : ''}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Item Code*</label>
                  <input
                    type="text"
                    value={item.itemCode}
                    onChange={(e) => handleItemChange(item.id, 'itemCode', e.target.value)}
                    className={`w-full ${!item.itemCode && formErrors.items ? 'border-red-500 ring-red-500' : ''}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Unit</label>
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
                  <label className="text-sm font-medium mb-1 block">Weight</label>
                  <input
                    type="text"
                    value={item.weight}
                    onChange={(e) => handleItemChange(item.id, 'weight', e.target.value)}
                    className="w-full"
                  />
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
<button
  type="submit"
  disabled={!isFormValid}
  className={`primary flex items-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  <Save size={18} className="mr-2" />
  {editData ? 'Update Stock' : 'Create Stock'}
</button>
      </div>
    </form>
  );
};

export default AddStocks;
