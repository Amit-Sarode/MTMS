export interface MrItem {
  id: string;
  itemName: string;
  itemCode: string;
  drawingUrl?: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'available' | 'unavailable' | 'partial';
}

export interface IMr {
  id: string;
  bomId: string;
  clientName: string;
  createdDate: string;
  status: 'pending' | 'sent_to_supplier' | 'in_qa' | 'completed' | 'rejected';
  assignedTo?: string;
  items: MrItem[];
}