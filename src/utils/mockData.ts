import { IBom, BomItem } from '../types/bomTypes';
import { IMr, MrItem } from '../types/mrTypes';
import { ISupplierStatus, SupplierItem } from '../types/supplierTypes';
import { IQaStatus, QaItem } from '../types/qaTypes';
import { generateId } from './helpers';

// Sample item names for generating mock data
const itemNames = [
  'Steel Beam', 'Copper Pipe', 'Aluminum Sheet', 'Brass Fitting',
  'PVC Pipe', 'Rubber Gasket', 'Plastic Molding', 'Carbon Fiber Panel',
  'Glass Panel', 'Wood Panel', 'Stainless Bolt', 'Titanium Rod',
  'Ceramic Insulator', 'Silicon Seal', 'Nylon Bearing'
];

// Generate random date within the last 30 days
const getRandomDate = (future = false) => {
  const now = new Date();
  const range = future ? 30 : -30; // days in the past or future
  const randomDays = Math.floor(Math.random() * Math.abs(range)) * Math.sign(range);
  const date = new Date(now);
  date.setDate(date.getDate() + randomDays);
  return date.toISOString().split('T')[0];
};

// Generate random BOM items
const generateBomItems = (count: number): BomItem[] => {
  const items: BomItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * itemNames.length);
    const item: BomItem = {
      id: generateId(),
      itemName: itemNames[randomIndex],
      itemCode: `ITEM-${100 + Math.floor(Math.random() * 900)}`,
      drawingUrl: Math.random() > 0.3 ? `https://example.com/drawings/${generateId()}` : '',
      size: Math.random() > 0.3 ? `${Math.floor(Math.random() * 100)}x${Math.floor(Math.random() * 100)}` : '',
      quantity: 1 + Math.floor(Math.random() * 10),
      unit: ['nos', 'meter', 'kg'][Math.floor(Math.random() * 3)],
      weight: Math.random() > 0.3 ? `${Math.floor(Math.random() * 100)} kg` : '',
      inStock: Math.random() > 0.7,
      createdDate: getRandomDate(),
      expectedDeliveryDate: getRandomDate(true)
    };
    
    items.push(item);
  }
  
  return items;
};

// Generate mock BOM data
export const generateMockBomData = (count: number): IBom[] => {
  const boms: IBom[] = [];
  
  for (let i = 0; i < count; i++) {
    const itemCount = 2 + Math.floor(Math.random() * 6); // 2-7 items per BOM
    const bom: IBom = {
      id: generateId(),
      clientName: `Client ${i + 1}`,
      clientContactNumber: `+1 555-${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
      createdDate: getRandomDate(),
      expectedDate: getRandomDate(true),
      items: generateBomItems(itemCount)
    };
    
    boms.push(bom);
  }
  
  return boms;
};

// Generate mock MR data
export const generateMockMrData = (count: number): IMr[] => {
  const mrs: IMr[] = [];
  
  const statuses: Array<'pending' | 'sent_to_supplier' | 'in_qa' | 'completed' | 'rejected'> = [
    'pending', 'sent_to_supplier', 'in_qa', 'completed', 'rejected'
  ];
  
  for (let i = 0; i < count; i++) {
    const bomId = generateId();
    const itemCount = 2 + Math.floor(Math.random() * 5); // 2-6 items per MR
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];
    
    const items: MrItem[] = [];
    for (let j = 0; j < itemCount; j++) {
      const randomIndex = Math.floor(Math.random() * itemNames.length);
      const itemStatus: Array<'pending' | 'available' | 'unavailable' | 'partial'> = [
        'pending', 'available', 'unavailable', 'partial'
      ];
      
      const item: MrItem = {
        id: generateId(),
        itemName: itemNames[randomIndex],
        itemCode: `ITEM-${100 + Math.floor(Math.random() * 900)}`,
        drawingUrl: Math.random() > 0.6 ? `https://example.com/drawings/${generateId()}` : undefined,
        quantity: 1 + Math.floor(Math.random() * 10),
        unit: ['nos', 'meter', 'kg'][Math.floor(Math.random() * 3)],
        status: itemStatus[Math.floor(Math.random() * itemStatus.length)]
      };
      
      items.push(item);
    }
    
    const mr: IMr = {
      id: generateId(),
      bomId,
      clientName: `Client ${i + 1}`,
      createdDate: getRandomDate(),
      status,
      assignedTo: status !== 'pending' ? `Supplier ${Math.floor(Math.random() * 5) + 1}` : undefined,
      items
    };
    
    mrs.push(mr);
  }
  
  return mrs;
};

// Generate mock Supplier data
export const generateMockSupplierData = (count: number): ISupplierStatus[] => {
  const suppliers: ISupplierStatus[] = [];
  
  const statuses: Array<'pending' | 'in_progress' | 'ready' | 'in_qa' | 'completed'> = [
    'pending', 'in_progress', 'ready', 'in_qa', 'completed'
  ];
  
  for (let i = 0; i < count; i++) {
    const mrId = generateId();
    const itemCount = 2 + Math.floor(Math.random() * 5); // 2-6 items per supplier
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];
    
    const items: SupplierItem[] = [];
    let availableCount = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const randomIndex = Math.floor(Math.random() * itemNames.length);
      const itemStatus: Array<'pending' | 'available' | 'unavailable' | 'partial'> = [
        'pending', 'available', 'unavailable', 'partial'
      ];
      
      const itemStatusValue = itemStatus[Math.floor(Math.random() * itemStatus.length)];
      if (itemStatusValue === 'available') {
        availableCount++;
      } else if (itemStatusValue === 'partial') {
        availableCount += 0.5;
      }
      
      const item: SupplierItem = {
        id: generateId(),
        itemName: itemNames[randomIndex],
        itemCode: `ITEM-${100 + Math.floor(Math.random() * 900)}`,
        quantity: 1 + Math.floor(Math.random() * 10),
        unit: ['nos', 'meter', 'kg'][Math.floor(Math.random() * 3)],
        status: itemStatusValue,
        notes: Math.random() > 0.7 ? 'Some notes about this item' : undefined
      };
      
      items.push(item);
    }
    
    const supplier: ISupplierStatus = {
      id: generateId(),
      mrId,
      supplierName: `Supplier ${i + 1}`,
      contactPerson: `Contact Person ${i + 1}`,
      contactNumber: `+1 555-${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
      assignedDate: getRandomDate(),
      totalItems: itemCount,
      availableItems: Math.floor(availableCount),
      status,
      items
    };
    
    suppliers.push(supplier);
  }
  
  return suppliers;
};

// Generate mock QA data
export const generateMockQaData = (count: number): IQaStatus[] => {
  const qas: IQaStatus[] = [];
  
  const statuses: Array<'pending' | 'in_progress' | 'approved' | 'rejected'> = [
    'pending', 'in_progress', 'approved', 'rejected'
  ];
  
  for (let i = 0; i < count; i++) {
    const mrId = generateId();
    const itemCount = 2 + Math.floor(Math.random() * 5); // 2-6 items per QA check
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];
    
    const items: QaItem[] = [];
    let passedCount = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const randomIndex = Math.floor(Math.random() * itemNames.length);
      const itemStatus: Array<'pending' | 'passed' | 'failed'> = [
        'pending', 'passed', 'failed'
      ];
      
      const itemStatusValue = itemStatus[Math.floor(Math.random() * itemStatus.length)];
      if (itemStatusValue === 'passed') {
        passedCount++;
      }
      
      const item: QaItem = {
        id: generateId(),
        itemName: itemNames[randomIndex],
        itemCode: `ITEM-${100 + Math.floor(Math.random() * 900)}`,
        drawingUrl: Math.random() > 0.6 ? `https://example.com/drawings/${generateId()}` : undefined,
        quantity: 1 + Math.floor(Math.random() * 10),
        unit: ['nos', 'meter', 'kg'][Math.floor(Math.random() * 3)],
        status: itemStatusValue,
        qaNote: Math.random() > 0.7 ? 'QA inspection notes' : undefined
      };
      
      items.push(item);
    }
    
    const qa: IQaStatus = {
      id: generateId(),
      mrId,
      supplierName: `Supplier ${i + 1}`,
      receivedDate: getRandomDate(),
      inspector: Math.random() > 0.3 ? `Inspector ${i + 1}` : undefined,
      totalItems: itemCount,
      passedItems: passedCount,
      status,
      items
    };
    
    qas.push(qa);
  }
  
  return qas;
};