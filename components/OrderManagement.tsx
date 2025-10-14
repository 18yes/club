
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { allOrders } from '../mockData';

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
    const [orders, setOrders] = useState<Order[]>(allOrders);
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
                                    <p className="text-xs text-gray-400">ID: {order.id} | {order.orderTime}</p>
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
