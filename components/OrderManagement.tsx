import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

const mockOrders: Order[] = [
    { id: 'O1', productName: '大师级陪练', status: OrderStatus.Completed, amount: 50, date: '2023-10-26', userId: 'U1', userName: '玩家_8888' },
    { id: 'O2', productName: '极速上分套餐', status: OrderStatus.InProgress, amount: 100, date: '2023-10-27', userId: 'U2', userName: '大神_001' },
    { id: 'O3', productName: '团队开黑语音', status: OrderStatus.PendingSettlement, amount: 20, date: '2023-10-28', userId: 'U3', userName: '土豪哥' },
    { id: 'O4', productName: '大神带队通关', status: OrderStatus.InProgress, amount: 80, date: '2023-10-29', userId: 'U1', userName: '玩家_8888' },
    { id: 'O5', productName: '王者晋级赛', status: OrderStatus.PendingSettlement, amount: 120, date: '2023-10-30', userId: 'U4', userName: '管理员A' },
    { id: 'O6', productName: '新手体验陪练', status: OrderStatus.Completed, amount: 5, date: '2023-10-30', userId: 'U3', userName: '土豪哥' },
];

const getStatusInfo = (status: OrderStatus): { text: string; color: string } => {
    switch (status) {
        case OrderStatus.InProgress: return { text: '服务中', color: 'text-blue-400 bg-blue-900' };
        case OrderStatus.PendingSettlement: return { text: '待结算', color: 'text-yellow-400 bg-yellow-900' };
        case OrderStatus.Completed: return { text: '已完成', color: 'text-green-400 bg-green-900' };
        case OrderStatus.PendingAccept: return { text: '待接单', color: 'text-orange-400 bg-orange-900' };
        default: return { text: status, color: 'text-gray-400 bg-gray-700' };
    }
};

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [filter, setFilter] = useState<string>('全部');

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(currentOrders =>
            currentOrders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
    };

    const filteredOrders = orders.filter(order => {
        if (filter === '全部') return true;
        // The filter value is the text, not the enum key
        const statusInfo = getStatusInfo(order.status);
        return statusInfo.text === filter;
    });

    const filterOptions = ['全部', '服务中', '待结算', '已完成'];

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">订单管理</h3>
            
            <div className="mb-4 flex space-x-2">
                {filterOptions.map(option => (
                    <button 
                        key={option}
                        onClick={() => setFilter(option)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            filter === option
                            ? 'bg-brand-primary text-white'
                            : 'bg-dark-card hover:bg-dark-border text-dark-text-secondary'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="bg-dark-card shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">订单信息</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">用户</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">金额</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">状态</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id} className="hover:bg-dark-border">
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="font-semibold">{order.productName}</p>
                                    <p className="text-xs text-gray-400">ID: {order.id} | {order.date}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p>{order.userName}</p>
                                    <p className="text-xs text-gray-400">ID: {order.userId}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="font-bold text-red-400">¥{order.amount.toFixed(2)}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusInfo(order.status).color}`}>
                                        {getStatusInfo(order.status).text}
                                    </span>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    {order.status === OrderStatus.InProgress && (
                                        <button onClick={() => handleUpdateStatus(order.id, OrderStatus.PendingSettlement)} className="text-yellow-400 hover:underline">标记结算</button>
                                    )}
                                    {order.status === OrderStatus.PendingSettlement && (
                                        <button onClick={() => handleUpdateStatus(order.id, OrderStatus.Completed)} className="text-green-400 hover:underline">完成结算</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
