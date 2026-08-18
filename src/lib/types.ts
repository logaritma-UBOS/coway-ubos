export interface Agent {
  id: string;
  fullName: string;
  whatsappNumber: string;
  email: string;
  cowayId?: string;
  slug: string;
  profileImageUrl?: string;
  bio?: string;
  metaPixelId?: string;
  isActive: boolean;
  isPremium: boolean;
}

export interface Lead {
  id: string;
  agentId: string;
  customerName: string;
  whatsappNumber: string;
  city?: string;
  targetProduct?: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
}

export interface ServiceOrder {
  id: string;
  serviceName: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'COMPLETED';
  date: string;
}
