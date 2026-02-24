
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  BarChart3, 
  Plug, 
  User,
  Package,
  MessageCircle,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  HelpCircle,
  Navigation
} from 'lucide-react';
import { OrderStatus, Platform } from './types';

export const COLORS = {
  primary: '#2563eb',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  preparing: '#3b82f6',
  ready: '#10b981',
  delivering: '#8b5cf6',
  delivered: '#64748b',
  pending: '#f59e0b',
};

export const STATUS_CONFIG = {
  [OrderStatus.PENDING]: { label: 'Pendente', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  [OrderStatus.PREPARING]: { label: 'Em Preparo', color: 'bg-blue-100 text-blue-700', icon: Clock },
  [OrderStatus.READY]: { label: 'Pronto', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  [OrderStatus.DELIVERING]: { label: 'Em Rota', color: 'bg-purple-100 text-purple-700', icon: Navigation },
  [OrderStatus.DELIVERED]: { label: 'Entregue', color: 'bg-slate-100 text-slate-600', icon: Truck },
  [OrderStatus.CANCELLED]: { label: 'Cancelado', color: 'bg-rose-100 text-rose-700', icon: AlertCircle },
};

export const PLATFORM_CONFIG = {
  [Platform.IFOOD]: { label: 'iFood', color: 'bg-red-600', icon: ShoppingBag },
  [Platform.WHATSAPP]: { label: 'WhatsApp', color: 'bg-green-500', icon: MessageCircle },
  [Platform.MANUAL]: { label: 'Manual', color: 'bg-slate-500', icon: User },
};

export const NAVIGATION = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'orders', label: 'Pedidos', icon: ShoppingBag, path: '/orders' },
  { id: 'integrations', label: 'Integrações', icon: Plug, path: '/integrations' },
  { id: 'products', label: 'Cardápio', icon: Package, path: '/products' },
  { id: 'reports', label: 'Relatórios', icon: BarChart3, path: '/reports' },
  { id: 'settings', label: 'Configurações', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Ajuda', icon: HelpCircle, path: '/help' },
];
