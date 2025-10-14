
import React, { useState, useMemo } from 'react';
import { User, Order, OrderStatus } from '../types';
import Card from './Card';
import Modal from './Modal';
import QrCodeIcon from './icons/QrCodeIcon';

interface ProfilePageProps {
    user: User;
    orders: Order[];
    onDepositRechargeClick: () => void;
    onBalanceRechargeClick: () => void;
    onUpdateUser: (user: User) => void;
    onShowOrderList: (status: OrderStatus) => void;
}

const ShareModal: React.FC<{onClose: () => void, userId: string}> = ({onClose, userId}) => (
    <div className="text-center p-4">
        <h2 className="text-xl font-bold text-brand-secondary mb-4">分享我的团队</h2>
        <div className="flex justify-center mb-4">
            <QrCodeIcon className="w-48 h-48" />
        </div>
        <p className="text-dark-text-secondary text-sm mb-2">扫描二维码或复制链接邀请好友</p>
        <input 
            type="text" 
            readOnly 
            value={`https://club.platform/join?ref=${userId}`}
            className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-center"
        />
        <button 
            onClick={() => navigator.clipboard.writeText(`https://club.platform/join?ref=${userId}`)}
            className="mt-4 w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
            复制链接
        </button>
    </div>
);

const FundItem: React.FC<{ value: string | number; label: string; isAction?: boolean; onClick?: () => void }> = ({ value, label, isAction = false, onClick }) => {
    const content = isAction ? (
        <button 
            onClick={onClick} 
            className="text-3xl font-bold text-red-500 transition-transform transform hover:scale-110"
        >
            {value}
        </button>
    ) : (
        <p className="text-2xl font-bold">{typeof value === 'number' ? value.toFixed(2) : value}</p>
    );

    return (
        <div 
            className={`flex flex-col items-center justify-center w-1/3 ${onClick && !isAction ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {content}
            <p className="text-sm text-dark-text-secondary mt-1">{label}</p>
        </div>
    );
};

const ActionModalContent: React.FC<{
    title: string;
    actionLabel: string;
    currentValue: number;
    maxValue: number;
    onConfirm: (amount: number) => void;
    onClose: () => void;
    balanceCheck?: boolean;
}> = ({ title, actionLabel, currentValue, maxValue, onConfirm, onClose }) => {
    const [amount, setAmount] = useState('');

    const handleConfirm = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert('请输入有效的正数金额。');
            return;
        }
        if (numAmount > maxValue) {
            alert(`操作金额不能超过 ${maxValue.toFixed(2)} 元。`);
            return;
        }
        onConfirm(numAmount);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brand-secondary">{title}</h2>
            <p className="text-center text-sm text-dark-text-secondary">
                当前{actionLabel}: <span className="font-semibold text-dark-text-primary">{currentValue.toFixed(2)}</span> 元
            </p>
            <div>
                <label htmlFor="actionAmount" className="block text-sm font-medium text-dark-text-secondary">操作金额 (元)</label>
                <input
                    type="number"
                    id="actionAmount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    placeholder={`最多 ${maxValue.toFixed(2)}`}
                />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button onClick={handleConfirm} className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">确认{actionLabel}</button>
            </div>
        </div>
    );
};


const ProfilePage: React.FC<ProfilePageProps> = ({ user, orders, onDepositRechargeClick, onBalanceRechargeClick, onUpdateUser, onShowOrderList }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'unfreeze' | 'payout' | null>(null);

    const myOrderStats = useMemo(() => {
        const myOrders = orders.filter(o => o.hitterId === user.id);
        return {
            inProgress: myOrders.filter(o => o.status === OrderStatus.InProgress).length,
            pendingSettlement: myOrders.filter(o => o.status === OrderStatus.PendingSettlement).length,
            completed: myOrders.filter(o => o.status === OrderStatus.Completed).length,
        }
    }, [orders, user.id]);

    const orderHallStats = useMemo(() => {
        const availableOrders = orders.filter(o => o.status === OrderStatus.PendingAccept);
        return {
            all: availableOrders.length,
            mobile: availableOrders.filter(o => o.platform === 'mobile').length,
            pc: availableOrders.filter(o => o.platform === 'pc').length,
        }
    }, [orders]);

    const closeModal = () => {
        setModalType(null);
    };

    const handleUnfreeze = (amount: number) => {
        const updatedUser: User = {
            ...user,
            balance: user.balance + amount,
            unfreezableBalance: user.unfreezableBalance - amount,
        };
        onUpdateUser(updatedUser);
        alert(`成功解冻 ${amount.toFixed(2)} 元到可用余额！`);
        closeModal();
    };

    const handlePayout = (amount: number) => {
        if (amount > user.balance) {
            alert('您的可用余额不足以完成此操作。');
            return;
        }
        const updatedUser: User = {
            ...user,
            balance: user.balance - amount,
            toBePaid: user.toBePaid - amount,
            paidOut: user.paidOut + amount,
        };
        onUpdateUser(updatedUser);
        alert(`成功赔付 ${amount.toFixed(2)} 元！`);
        closeModal();
    };

    const renderActionModal = () => {
        if (modalType === 'unfreeze') {
            return (
                <ActionModalContent
                    title="余额解冻"
                    actionLabel="解冻"
                    currentValue={user.unfreezableBalance}
                    maxValue={user.unfreezableBalance}
                    onConfirm={handleUnfreeze}
                    onClose={closeModal}
                />
            );
        }

        if (modalType === 'payout') {
            return (
                <ActionModalContent
                    title="执行赔付"
                    actionLabel="赔付"
                    currentValue={user.toBePaid}
                    maxValue={Math.min(user.toBePaid, user.balance)}
                    onConfirm={handlePayout}
                    onClose={closeModal}
                    balanceCheck={true}
                />
            );
        }

        return null;
    };


    return (
        <div className="container mx-auto px-4 space-y-6">
            {/* User Info Header */}
            <div className="flex items-center space-x-4 p-4 bg-dark-card rounded-lg">
                <img src={`https://picsum.photos/seed/${user.id}/80/80`} alt="User Avatar" className="w-20 h-20 rounded-full border-2 border-brand-primary" />
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-sm text-dark-text-secondary">ID: {user.id}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">{user.hitterIdentity}</span>
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">{user.vipLevel}</span>
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">{user.hitterLevel}</span>
                        {user.badges.map(badge => (
                             <span key={badge} className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">{badge}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* My Funds Section - Redesigned */}
            <Card>
                <h3 className="text-xl font-bold mb-4">我的资金</h3>
                <div className="space-y-6">
                    <div className="flex justify-around text-center">
                        <FundItem value={user.deposit} label="保证金" onClick={onDepositRechargeClick} />
                        <FundItem value={user.balance} label="可用余额" onClick={onBalanceRechargeClick} />
                        <FundItem value={user.frozenBalance} label="冻结余额" />
                    </div>
                    <div className="flex justify-around text-center items-center">
                        <FundItem value={user.unfreezableBalance} label="可解冻余额" />
                        <FundItem value={user.freezingBalance} label="冻结中余额" />
                        <FundItem value="+" label="余额解冻" isAction={true} onClick={() => setModalType('unfreeze')} />
                    </div>
                    <div className="flex justify-around text-center items-center">
                        <FundItem value={user.paidOut} label="已赔付" />
                        <FundItem value={user.toBePaid} label="待赔付" />
                        <FundItem value="+" label="赔付" isAction={true} onClick={() => setModalType('payout')} />
                    </div>
                </div>
            </Card>

            {/* My Team Section */}
            <Card>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">我的团队</h3>
                     <button onClick={() => setIsShareModalOpen(true)} className="px-3 py-1 text-sm rounded-md bg-brand-primary hover:bg-brand-secondary transition-colors">分享</button>
                </div>
                <div className="space-y-2 text-sm">
                     <div className="flex justify-between items-center">
                        <span className="text-dark-text-secondary">我加入的团队 (上级)</span>
                        <span>{user.uplineUserId}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-dark-text-secondary">我创建的团队 (下级)</span>
                        <span>3 人</span>
                    </div>
                </div>
            </Card>

            {/* My Orders Section */}
            <div className="space-y-6">
                <div className="bg-dark-card rounded-lg shadow-md overflow-hidden">
                    <div className="bg-rose-500 text-white font-bold p-3">
                        <h3 className="text-lg">我的接单</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-around text-center">
                            <div onClick={() => onShowOrderList(OrderStatus.InProgress)} className="cursor-pointer p-2 rounded-lg hover:bg-dark-bg transition-colors">
                                <p className="text-3xl font-bold">{myOrderStats.inProgress}</p>
                                <p className="text-sm text-dark-text-secondary mt-2">服务中</p>
                            </div>
                            <div onClick={() => onShowOrderList(OrderStatus.PendingSettlement)} className="cursor-pointer p-2 rounded-lg hover:bg-dark-bg transition-colors">
                                <p className="text-3xl font-bold">{myOrderStats.pendingSettlement}</p>
                                <p className="text-sm text-dark-text-secondary mt-2">待结算</p>
                            </div>
                            <div onClick={() => onShowOrderList(OrderStatus.Completed)} className="cursor-pointer p-2 rounded-lg hover:bg-dark-bg transition-colors">
                                <p className="text-3xl font-bold">{myOrderStats.completed}</p>
                                <p className="text-sm text-dark-text-secondary mt-2">已结单</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <h3 className="text-lg font-bold">接单大厅</h3>
                    <div className="mt-6">
                        <div className="flex justify-around text-center">
                            <div>
                                <p className="text-3xl font-bold">{orderHallStats.all}</p>
                                <p className="text-sm text-dark-text-secondary mt-2">全部单</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{orderHallStats.mobile}</p>
                                <p className="text-sm text-dark-text-secondary mt-2">手机端</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{orderHallStats.pc}</p>
                                <p className="text-sm text-dark-text-secondary mt-2">电脑端</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            
            <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}>
                <ShareModal onClose={() => setIsShareModalOpen(false)} userId={user.id}/>
            </Modal>
            
            <Modal isOpen={modalType !== null} onClose={closeModal}>
                {renderActionModal()}
            </Modal>
        </div>
    );
};

export default ProfilePage;
