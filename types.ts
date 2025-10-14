
export enum Page {
  Home = 'home',
  Category = 'category',
  Bar = 'bar',
  Profile = 'profile',
}

export enum UserRole {
  Boss = '老板',
  Hitter = '打手',
}

// NEW: Granular identity system
export enum HitterIdentity {
  None = '无身份',
  Normal = '普通打手',
  VIP = 'VIP打手',
  SuperVIP = '超级VIP打手',
  Auditor = '审核员',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  sales: number;
  category: string;
  description: string;
  badge?: string;
  platform?: 'mobile' | 'pc';
  specialType?: 'vip_certification' | 'assessment';
  grantsIdentity?: HitterIdentity; // NEW: Link product to identity
  serviceFee?: number; // NEW: Per-product service fee percentage
}

export enum BountyStatus {
  InProgress = '进行中',
  Completed = '已完成',
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: BountyStatus;
  participants: number;
  maxParticipants: number;
  platform?: 'mobile' | 'pc';
}

export enum OrderStatus {
  PendingPayment = '待付款',
  PendingAccept = '待接单',
  InProgress = '服务中',
  PendingSettlement = '待结算',
  Completed = '已完成',
  AfterSales = '售后中',
}

export interface Order {
  id: string;
  productName: string;
  status: OrderStatus;
  amount: number;
  userId: string; // The user who placed the order (Boss)
  userName: string;
  platform?: 'mobile' | 'pc';
  // NEW: Detailed fields for Order Hall
  productId: string;
  category: string;
  gameId: string;
  server: string;
  notes: string;
  hitterId?: string; // The user who accepted the order (Hitter)
  
  // NEW fields for detailed modal
  textId: string;
  orderTime: string;
  acceptTime: string | null;
  completionTime: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Frozen';
  balance: number;
  deposit: number; // 保证金
  frozenBalance: number;
  unfreezableBalance: number; // 可解冻余额
  freezingBalance: number; // 冻结中余额
  toBePaid: number; // 待赔付
  paidOut: number; // 已赔付
  hitterLevel: string; // e.g., '大师打手'
  hitterIdentity: HitterIdentity; // NEW: e.g., 'VIP打手'
  vipLevel: string;
  incomeLevel: string;
  seniorityLevel: string;
  badges: string[];
  teamId?: string; // ID of the team they created
  uplineUserId?: string; // Their inviter
}

export enum ComplaintStatus {
  Pending = '待处理',
  InProgress = '处理中',
  Resolved = '已解决',
}

export interface Complaint {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  subject: string;
  details: string;
  status: ComplaintStatus;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  leaderName: string;
  leaderId: string;
  memberCount: number;
  status: 'Active' | 'Frozen';
  createdAt: string;
}

export interface Announcement {
  id: string;
  content: string;
  createdAt: string;
  isActive: boolean;
}

export interface AdSlot {
  id: string;
  name: string;
  content: string;
  link: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
}

// NEW: Settings interfaces
export interface HitterLevelSetting {
    name: string;
    requiredIncome: number;
    haloColor: string;
}

export interface HitterIdentitySetting {
    identity: HitterIdentity;
    name: string;
    requiredProductId?: string;
    iconUrl: string;
}
