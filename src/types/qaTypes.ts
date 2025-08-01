export interface QaItem {
  id: string;
  itemName: string;
  itemCode: string;
  drawingUrl?: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'passed' | 'failed';
  qaNote?: string;
}

export interface IQaStatus {
  id: string;
  mrId: string;
  supplierName: string;
  receivedDate: string;
  inspector?: string;
  totalItems: number;
  passedItems: number;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected';
  items: QaItem[];
}