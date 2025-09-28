
import React from 'react';
import { Order, OrderStatus } from '../types';
import Card from './Card';

// FIX: Add missing userId and userName properties to mock orders to match the Order type.
const mockOrders: Order[] = [
    { id: '1', productName: '大师级陪练', status: OrderStatus.Completed, amount: 50, date: '2023-10-26', userId: '12345678', userName: '玩家_8888' },
    { id: '2', productName: '极速上分套餐', status: OrderStatus.InProgress, amount: 100, date: '2023-10-27', userId: '12345678', userName: '玩家_8888' },
    { id: '3', productName: '团队开黑语音', status: OrderStatus.PendingAccept, amount: 20, date: '2023-10-28', userId: '12345678', userName: '玩家_8888' },
];

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Completed: return 'text-green-400';
        case OrderStatus.InProgress: return 'text-blue-400';
        case OrderStatus.PendingAccept: return 'text-yellow-400';
        default: return 'text-gray-400';
    }
};

const ProfilePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-dark-card rounded-lg">
                <img src="https://picsum.photos/seed/avatar/80/80" alt="User Avatar" className="w-20 h-20 rounded-full border-2 border-brand-primary" />
                <div>
                    <h2 className="text-2xl font-bold">玩家_8888</h2>
                    <p className="text-sm text-dark-text-secondary">ID: 12345678</p>
                </div>
            </div>

            <Card>
                <div className="grid grid-cols-3 divide-x divide-dark-border text-center">
                    <div>
                        <p className="text-xl font-bold">1,250</p>
                        <p className="text-sm text-dark-text-secondary">我的积分</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">3</p>
                        <p className="text-sm text-dark-text-secondary">平台券</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">5</p>
                        <p className="text-sm text-dark-text-secondary">道具</p>
                    </div>
                </div>
            </Card>

            <div>
                <h3 className="text-xl font-bold mb-3">我的订单</h3>
                <div className="space-y-3">
                    {mockOrders.map(order => (
                        <Card key={order.id}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{order.productName}</p>
                                    <p className="text-xs text-dark-text-secondary">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</p>
                                    <p className="text-lg font-bold text-red-400">¥{order.amount}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="w-full h-20 bg-dark-card rounded-lg flex items-center justify-center">
                    <p className="text-dark-text-secondary">广告位 3</p>
                </div>
                <div className="w-full h-20 bg-dark-card rounded-lg flex items-center justify-center">
                    <p className="text-dark-text-secondary">广告位 4</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;