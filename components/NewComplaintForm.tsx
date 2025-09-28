
import React, { useState } from 'react';
import { Complaint } from '../types';

interface NewComplaintFormProps {
    onSave: (data: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => void;
    onClose: () => void;
}

const NewComplaintForm: React.FC<NewComplaintFormProps> = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        orderId: '',
        userId: '',
        userName: '',
        subject: '',
        details: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.orderId || !formData.userId || !formData.userName || !formData.subject || !formData.details) {
            alert('请填写所有字段');
            return;
        }
        onSave(formData);
    };

    const renderInput = (label: string, name: keyof typeof formData, value: string, type: string = 'text') => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-dark-text-secondary">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brand-secondary">新增客诉工单</h2>
            
            {renderInput('关联订单ID', 'orderId', formData.orderId)}
            {renderInput('关联用户ID', 'userId', formData.userId)}
            {renderInput('用户名称', 'userName', formData.userName)}
            {renderInput('客诉主题', 'subject', formData.subject)}
            
            <div>
                <label htmlFor="details" className="block text-sm font-medium text-dark-text-secondary">详细信息</label>
                <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">创建工单</button>
            </div>
        </form>
    );
};

export default NewComplaintForm;
