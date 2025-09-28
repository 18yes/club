import React, { useState } from 'react';
import { Announcement, AdSlot } from '../types';
import Modal from './Modal';
import AnnouncementForm from './AnnouncementForm';
import Card from './Card';

const mockAnnouncements: Announcement[] = [
    { id: 'A1', content: '平台将于午夜进行系统维护，请提前安排好您的订单。', createdAt: '2023-10-28', isActive: true },
    { id: 'A2', content: '国庆节活动上线！充值即送好礼，详情请见活动页面。', createdAt: '2023-09-30', isActive: true },
    { id: 'A3', content: '严禁使用第三方插件，一经发现将永久封号处理。', createdAt: '2023-09-15', isActive: false },
];

const mockAdSlots: AdSlot[] = [
    { id: 'ad-slot-1', name: '广告位 1 (首页)', content: '这是一个推广活动', link: '#' },
    { id: 'ad-slot-2', name: '广告位 2 (分类页)', content: '分类页专属优惠', link: '#' },
    { id: 'ad-slot-3', name: '广告位 3 (个人中心)', content: '邀请好友得奖励', link: '#' },
    { id: 'ad-slot-4', name: '广告位 4 (个人中心)', content: '成为VIP打手', link: '#' },
];

type AdManagementTab = 'announcements' | 'adSlots';

const AnnouncementsManager: React.FC = () => {
    const [announcements, setAnnouncements] = useState(mockAnnouncements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Partial<Announcement> | null>(null);
    
    const handleAddNewClick = () => {
        setEditingAnnouncement({});
        setIsModalOpen(true);
    };

    const handleEditClick = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        if (window.confirm('您确定要删除该公告吗？')) {
            setAnnouncements(prev => prev.filter(a => a.id !== id));
        }
    };
    
    const handleSave = (data: Partial<Announcement>) => {
        if (data.id) {
            setAnnouncements(prev => prev.map(a => a.id === data.id ? {...a, ...data} as Announcement : a));
        } else {
            const newAnnouncement: Announcement = {
                ...data,
                id: `A${Date.now()}`,
                createdAt: new Date().toISOString().split('T')[0],
                isActive: true,
            } as Announcement;
            setAnnouncements(prev => [newAnnouncement, ...prev]);
        }
        setIsModalOpen(false);
        setEditingAnnouncement(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">系统公告管理</h3>
                <button onClick={handleAddNewClick} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">
                    新增公告
                </button>
            </div>
             <div className="bg-dark-card shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                   <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">内容</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">创建日期</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">状态</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map(ann => (
                            <tr key={ann.id} className="hover:bg-dark-border">
                                <td className="px-5 py-4 border-b border-dark-border text-sm max-w-md">
                                    <p className="truncate">{ann.content}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">{ann.createdAt}</td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <span className={ann.isActive ? 'text-green-400' : 'text-gray-500'}>
                                        {ann.isActive ? '显示中' : '已隐藏'}
                                    </span>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm space-x-2 whitespace-no-wrap">
                                    <button onClick={() => handleEditClick(ann)} className="text-blue-400 hover:underline">编辑</button>
                                    <button onClick={() => handleDeleteClick(ann.id)} className="text-red-400 hover:underline">删除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AnnouncementForm announcement={editingAnnouncement} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}

const AdSlotsManager: React.FC = () => {
    const [adSlots, setAdSlots] = useState(mockAdSlots);

    const handleChange = (id: string, field: 'content' | 'link', value: string) => {
        setAdSlots(prev => prev.map(slot => slot.id === id ? { ...slot, [field]: value } : slot));
    };

    const handleSaveAll = () => {
        alert('所有广告位信息已保存！');
        console.log("Saving ad slots:", adSlots);
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">广告位管理</h3>
            <div className="space-y-4">
                {adSlots.map(slot => (
                    <Card key={slot.id}>
                        <h4 className="font-semibold text-brand-secondary mb-3">{slot.name}</h4>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor={`content-${slot.id}`} className="block text-sm font-medium text-dark-text-secondary">显示内容</label>
                                <input
                                    type="text"
                                    id={`content-${slot.id}`}
                                    value={slot.content}
                                    onChange={(e) => handleChange(slot.id, 'content', e.target.value)}
                                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                />
                            </div>
                             <div>
                                <label htmlFor={`link-${slot.id}`} className="block text-sm font-medium text-dark-text-secondary">跳转链接</label>
                                <input
                                    type="text"
                                    id={`link-${slot.id}`}
                                    value={slot.link}
                                    onChange={(e) => handleChange(slot.id, 'link', e.target.value)}
                                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
             <div className="flex justify-end mt-6">
                <button
                    onClick={handleSaveAll}
                    className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    保存所有广告位
                </button>
            </div>
        </div>
    )
}

const AdManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdManagementTab>('announcements');

    const TabButton: React.FC<{tab: AdManagementTab, label: string}> = ({tab, label}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
                activeTab === tab 
                ? 'border-brand-primary text-brand-primary' 
                : 'border-transparent text-dark-text-secondary hover:border-dark-border hover:text-dark-text-primary'
            }`}
        >
            {label}
        </button>
    )

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">广告管理</h2>
            <div className="border-b border-dark-border mb-6">
                <div className="flex space-x-2">
                    <TabButton tab="announcements" label="系统公告" />
                    <TabButton tab="adSlots" label="广告位管理" />
                </div>
            </div>
            <div>
                {activeTab === 'announcements' ? <AnnouncementsManager /> : <AdSlotsManager />}
            </div>
        </div>
    );
};

export default AdManagement;
