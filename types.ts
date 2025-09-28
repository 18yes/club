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

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  sales: number;
  category: string;
  description: string;
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
  date: string;
  userId: string;
  userName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Frozen';
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
