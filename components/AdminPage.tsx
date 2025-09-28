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

const mockUsers: User[] = [
    { id: '1', name: '玩家_8888', email: 'user1@example.com', role: 'User', status: 'Active' },
    { id: '2', name: '大神_001', email: 'hitter1@example.com', role: 'User', status: 'Active' },
    { id: '3', name: '土豪哥', email: 'boss1@example.com', role: 'User', status: 'Frozen' },
    { id: '4', name: '管理员A', email: 'admin@example.com', role: 'Admin', status: 'Active' },
];

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
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [editingUser, setEditingUser] = useState<User | null>(null);

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
