
import React from 'react';
import { Order, Product } from '../types';
import Modal from './Modal';

interface OrderDetailModalProps {
  order: Order;
  product?: Product;
  onClose: () => void;
  onAccept: (order: Order) => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode; valueClassName?: string }> = ({ label, value, valueClassName = '' }) => (
    <div className="flex justify-between items-center py-1.5">
        <span className="text-dark-text-secondary">{label}</span>
        <span className={`text-dark-text-primary text-right ${valueClassName}`}>{value}</span>
    </div>
);

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, product, onClose, onAccept }) => {
    const serviceFee = order.amount * (1 - (product?.serviceFee || 0) / 100);

    return (
        <Modal isOpen={!!order} onClose={onClose}>
            <div className="p-2">
                <h2 className="text-xl font-bold text-center text-purple-400 mb-6">订单详情</h2>
                
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center pb-3 mb-2 border-b border-dark-border">
                        <h3 className="font-bold text-lg text-dark-text-primary">{order.productName}</h3>
                        <span className="font-bold text-xl text-red-400">¥{order.amount.toFixed(2)}</span>
                    </div>
                    <DetailRow label="订单编号" value={order.id} />
                    <DetailRow label="商品分类" value={order.category} />
                    <DetailRow label="游戏ID" value={order.gameId} />
                    <DetailRow label="游戏区服" value={order.server} />
                    <DetailRow label="订单备注" value={order.notes} />
                    <DetailRow label="文字ID" value={order.textId} />
                    <DetailRow label="下单时间" value={order.orderTime} />
                    <DetailRow label="接单时间" value={order.acceptTime || '未接单'} />
                    <DetailRow label="完成时间" value={order.completionTime || '未完成'} />
                    <DetailRow label="订单备注" value={order.notes} />
                    
                    <div className="flex justify-between items-center pt-3 mt-2 border-t border-dark-border">
                        <span className="text-dark-text-secondary font-semibold">服务费</span>
                        <span className="font-bold text-lg text-red-400">¥{serviceFee.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <button
                        onClick={() => onAccept(order)}
                        className="w-full px-4 py-3 rounded-lg text-lg font-bold bg-purple-600 hover:bg-purple-500 transition-colors text-white"
                    >
                        立即接单
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors"
                    >
                        关闭
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailModal;
