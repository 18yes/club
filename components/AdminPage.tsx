
import React, { useState } from 'react';
import { User } from '../types';
import Modal from './Modal';
import UserEditForm from './UserEditForm';
import SettingsPage from './SettingsPage';
import ComplaintManagement from './ComplaintManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import TeamManagement from './TeamManagement';
import AdManagement from './AdManagement';
import { allUsers } from '../mockData';


const AdminSidebar: React.FC<{activeItem: string, setActiveItem: (item: string) => void}> = ({ activeItem, setActiveItem }) => {
    const navItems = ['广告管理', '用户管理', '团队管理', '商品管理', '订单管理', '客诉管理', '后台设置'];
    return (
        <aside className="w-64 bg-dark-card text-dark-text-primary flex-shrink-0">
            <div className="p-4 border-b border-dark-border">
                <h2 className="text-xl font-bold text-brand-secondary">后台管理</h2>
            </div>
            <nav className="p-2">
                <ul>
                    {navItems.map(item => (
                        <li key={item}>
                            <button 
                                onClick={() => setActiveItem(item)}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeItem === item ? 'bg-brand-primary' : 'hover:bg-dark-border'}`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>(allUsers);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [payoutUser, setPayoutUser] = useState<User | null>(null);
    const [payoutAmount, setPayoutAmount] = useState<string>('');

    const handleEditClick = (user: User) => {
        setEditingUser(user);
    };

    const handleCloseModal = () => {
        setEditingUser(null);
    };

    const handleSaveUser = (updatedUser: User) => {
        setUsers(currentUsers => currentUsers.map(u => (u.id === updatedUser.id ? updatedUser : u)));
        handleCloseModal();
    };

    const handleToggleStatus = (userId: string) => {
        setUsers(currentUsers =>
            currentUsers.map(user =>
                user.id === userId
                    ? { ...user, status: user.status === 'Active' ? 'Frozen' : 'Active' }
                    : user
            )
        );
    };

    const handleDeleteUser = (userId: string) => {
        if (window.confirm('您确定要删除该用户吗？此操作不可撤销。')) {
            setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
        }
    };

    const handlePayoutClick = (user: User) => {
        setPayoutUser(user);
        setPayoutAmount('');
    };

    const handleConfirmPayout = () => {
        const amount = parseFloat(payoutAmount);
        if (!payoutUser || isNaN(amount) || amount <= 0) {
            alert("请输入有效的正数赔付金额");
            return;
        }

        setUsers(currentUsers =>
            currentUsers.map(u =>
                u.id === payoutUser.id
                    ? { ...u, balance: u.balance - amount }
                    : u
            )
        );
        alert(`已成功从用户 ${payoutUser.name} 的余额中扣除赔付金额 ¥${amount}`);
        setPayoutUser(null);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">用户管理</h3>
            <div className="bg-dark-card shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">用户</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">角色</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">状态</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-dark-border">
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="text-dark-text-primary whitespace-no-wrap">{user.name}</p>
                                    <p className="text-gray-400 whitespace-no-wrap">{user.email}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="text-dark-text-primary whitespace-no-wrap">{user.role}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.status === 'Active' ? 'text-green-300' : 'text-red-300'}`}>
                                        <span aria-hidden className={`absolute inset-0 ${user.status === 'Active' ? 'bg-green-800' : 'bg-red-800'} opacity-50 rounded-full`}></span>
                                        <span className="relative">{user.status}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm space-x-2">
                                    <button onClick={() => handleEditClick(user)} className="text-blue-400 hover:underline">编辑</button>
                                    <button onClick={() => handlePayoutClick(user)} className="text-orange-400 hover:underline">赔付</button>
                                    <button onClick={() => handleToggleStatus(user.id)} className="text-yellow-400 hover:underline">
                                        {user.status === 'Active' ? '冻结' : '解冻'}
                                    </button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:underline">删除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingUser && (
                <Modal isOpen={!!editingUser} onClose={handleCloseModal}>
                    <UserEditForm 
                        user={editingUser}
                        onSave={handleSaveUser}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
             {payoutUser && (
                <Modal isOpen={!!payoutUser} onClose={() => setPayoutUser(null)}>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-center text-brand-secondary">执行赔付</h2>
                        <p className="text-center">为用户 <span className="font-semibold text-dark-text-primary">{payoutUser.name}</span> 执行赔付操作。</p>
                        <div>
                            <label htmlFor="payoutAmount" className="block text-sm font-medium text-dark-text-secondary">赔付金额 (元)</label>
                            <input
                                type="number"
                                id="payoutAmount"
                                value={payoutAmount}
                                onChange={(e) => setPayoutAmount(e.target.value)}
                                className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="输入扣除金额"
                            />
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button onClick={() => setPayoutUser(null)} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                            <button onClick={handleConfirmPayout} className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">确认赔付</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};


const AdminPage: React.FC = () => {
    const [activeItem, setActiveItem] = useState('广告管理');

    const renderContent = () => {
        switch (activeItem) {
            case '广告管理':
                return <AdManagement />;
            case '用户管理':
                return <UserManagement />;
            case '团队管理':
                return <TeamManagement />;
            case '商品管理':
                return <ProductManagement />;
            case '订单管理':
                return <OrderManagement />;
            case '客诉管理':
                return <ComplaintManagement />;
            case '后台设置':
                return <SettingsPage />;
            default:
                return <div className="text-center p-10"><h3 className="text-2xl">{activeItem}</h3><p className="text-dark-text-secondary mt-2">此模块内容待开发。</p></div>;
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-68px)]">
            <AdminSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
            <main className="flex-1 p-6 bg-dark-bg">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminPage;
