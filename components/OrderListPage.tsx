
import React, { useMemo } from 'react';
import { User, Order, OrderStatus } from '../types';
import Card from './Card';

interface OrderListPageProps {
    user: User;
    orders: Order[];
    filterStatus: OrderStatus;
    onBack: () => void;
}

const getStatusInfo = (status: OrderStatus): { text: string; color: string } => {
    switch (status) {
        case OrderStatus.InProgress: return { text: '服务中', color: 'text-blue-400' };
        case OrderStatus.PendingSettlement: return { text: '待结算', color: 'text-yellow-400' };
        case OrderStatus.Completed: return { text: '已完成', color: 'text-green-400' };
        default: return { text: status, color: 'text-gray-400' };
    }
};

const OrderListPage: React.FC<OrderListPageProps> = ({ user, orders, filterStatus, onBack }) => {
    const filteredOrders = useMemo(() => {
        return orders.filter(o => o.hitterId === user.id && o.status === filterStatus);
    }, [orders, user.id, filterStatus]);

    const title = `我的接单 - ${getStatusInfo(filterStatus).text}`;

    const OrderItem: React.FC<{ order: Order }> = ({ order }) => (
        <Card>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-brand-secondary flex-1 pr-4">{order.productName}</h3>
                <p className="text-xl font-bold text-red-400">¥{order.amount.toFixed(2)}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-dark-border text-sm text-dark-text-secondary space-y-1.5">
                <div className="flex justify-between">
                    <span>订单老板:</span>
                    <span className="text-dark-text-primary">{order.userName}</span>
                </div>
                <div className="flex justify-between">
                    <span>订单号:</span>
                    <span className="text-dark-text-primary">{order.id}</span>
                </div>
                <div className="flex justify-between">
                    <span>下单时间:</span>
                    <span className="text-dark-text-primary">{order.orderTime}</span>
                </div>
                 <div className="flex justify-between">
                    <span>订单状态:</span>
                    <span className={`font-semibold ${getStatusInfo(order.status).color}`}>{getStatusInfo(order.status).text}</span>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="min-h-screen bg-dark-bg">
            <header className="bg-dark-card p-4 shadow-md flex items-center sticky top-0 z-50 border-b border-dark-border">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-dark-border transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-dark-text-primary">{title}</h1>
            </header>

            <main className="p-4 space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => <OrderItem key={order.id} order={order} />)
                ) : (
                    <Card className="text-center py-16">
                        <p className="text-dark-text-secondary">这里空空如也，没有相关订单。</p>
                    </Card>
                )}
            </main>
        </div>
    );
};

export default OrderListPage;
