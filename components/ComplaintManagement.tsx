
import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import Modal from './Modal';
import NewComplaintForm from './NewComplaintForm';

const mockComplaints: Complaint[] = [
    { id: 'C1', orderId: 'O2', userId: 'U2', userName: '大神_001', subject: '服务时长不足', details: '陪练服务原定1小时，实际只有50分钟。', status: ComplaintStatus.Pending, createdAt: '2023-10-28' },
    { id: 'C2', orderId: 'O1', userId: 'U1', userName: '玩家_8888', subject: '账号登录异常', details: '完成服务后，我的账号无法正常登录，怀疑有安全风险。', status: ComplaintStatus.InProgress, createdAt: '2023-10-27' },
    { id: 'C3', orderId: 'O3', userId: 'U3', userName: '土豪哥', subject: '货不对板', details: '下单的是团队语音，但提供的是单人服务。', status: ComplaintStatus.Resolved, createdAt: '2023-10-26' },
];

const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
        case ComplaintStatus.Pending: return 'text-yellow-400 bg-yellow-900';
        case ComplaintStatus.InProgress: return 'text-blue-400 bg-blue-900';
        case ComplaintStatus.Resolved: return 'text-green-400 bg-green-900';
        default: return 'text-gray-400 bg-gray-700';
    }
}

const ComplaintManagement: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = (complaintId: string, newStatus: ComplaintStatus) => {
        setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status: newStatus } : c));
    };

    const handleAddComplaint = (newComplaintData: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => {
        const newComplaint: Complaint = {
            ...newComplaintData,
            id: `C${Date.now()}`,
            createdAt: new Date().toISOString().split('T')[0],
            status: ComplaintStatus.Pending,
        };
        setComplaints(prev => [newComplaint, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">客诉管理</h3>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    新增客诉
                </button>
            </div>

            <div className="bg-dark-card shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">客诉ID</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">关联用户</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">主题</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">状态</th>
                             <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">创建日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(complaint => (
                            <tr key={complaint.id} className="hover:bg-dark-border">
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="font-semibold">{complaint.id}</p>
                                    <p className="text-xs text-gray-400">Order: {complaint.orderId}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p>{complaint.userName}</p>
                                     <p className="text-xs text-gray-400">User: {complaint.userId}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">{complaint.subject}</td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <select 
                                        value={complaint.status} 
                                        onChange={(e) => handleStatusChange(complaint.id, e.target.value as ComplaintStatus)}
                                        className={`w-full p-1 rounded-md text-xs border-none focus:ring-0 ${getStatusColor(complaint.status)}`}
                                    >
                                        <option value={ComplaintStatus.Pending}>待处理</option>
                                        <option value={ComplaintStatus.InProgress}>处理中</option>
                                        <option value={ComplaintStatus.Resolved}>已解决</option>
                                    </select>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">{complaint.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NewComplaintForm onSave={handleAddComplaint} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default ComplaintManagement;
