
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum Platform {
  WHATSAPP = 'WHATSAPP',
  IFOOD = 'IFOOD',
  MANUAL = 'MANUAL'
}

export enum PaymentMethod {
  PAID = 'PAID', // Já pago (iFood / Link WhatsApp)
  MONEY = 'MONEY',
  PIX = 'PIX',
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export enum ServiceType {
  EAT_IN = 'EAT_IN',
  TAKEAWAY = 'TAKEAWAY',
  DELIVERY = 'DELIVERY'
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  platform: Platform;
  customerName: string;
  address?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes?: string;
  phoneNumber?: string;
  paymentMethod: PaymentMethod;
  serviceType: ServiceType;
  tableNumber?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  syncStatus: {
    ifood: boolean;
    whatsapp: boolean;
  }
}

export interface Metric {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}
