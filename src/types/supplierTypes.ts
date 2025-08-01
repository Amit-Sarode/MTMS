export interface SupplierItem {
  id: string;
  itemName: string;
  itemCode: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'available' | 'unavailable' | 'partial';
  notes?: string;
}

export interface ISupplierStatus {
  id: string;
  mrId: string;
  supplierName: string;
  contactPerson: string;
  contactNumber: string;
  assignedDate: string;
  totalItems: number;
  availableItems: number;
  status: 'pending' | 'in_progress' | 'ready' | 'in_qa' | 'completed';
  items: SupplierItem[];
}