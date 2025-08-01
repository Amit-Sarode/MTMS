export interface BomItem {
  id: string;
  itemName: string;
  itemCode: string;
  drawingUrl?: string;
  size?: string;
  quantity: number;
  unit: string;
  weight?: string;
  inStock: boolean;
  createdDate: string;
  expectedDeliveryDate?: string;
}

export interface IBom {
  id: string;
  clientName: string;
  clientContactNumber: string;
  createdDate: string;
  expectedDate: string;
  items: BomItem[];
}


export interface StockItem {
  id: string;
  itemName: string;
  itemCode: string;
  quantity: number;
  unit: string;
  weight: string;
  inStock: boolean;
  expectedDeliveryDate: string;
}

export interface IStock {
  id: string;
  stockName: string;
  stockId: string;
  createdDate: string;
  items: StockItem[];
}