import React, { useState, useEffect } from 'react';
import { Team } from '../types';

interface TeamFormProps {
    team: Partial<Team> | null;
    onSave: (team: Partial<Team>) => void;
    onClose: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ team, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<Team>>({
        name: '',
        leaderName: '',
        leaderId: '',
    });

    useEffect(() => {
        if (team) {
            setFormData(team);
        }
    }, [team]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.leaderName || !formData.leaderId) {
            alert('请填写所有必填字段。');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brand-secondary">
                {team?.id ? '编辑团队' : '添加新团队'}
            </h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-text-secondary">团队名称</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>

            <div>
                <label htmlFor="leaderName" className="block text-sm font-medium text-dark-text-secondary">团长名称</label>
                <input
                    type="text"
                    id="leaderName"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>
            
            <div>
                <label htmlFor="leaderId" className="block text-sm font-medium text-dark-text-secondary">团长用户ID</label>
                <input
                    type="text"
                    id="leaderId"
                    name="leaderId"
                    value={formData.leaderId}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>


            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">保存团队</button>
            </div>
        </form>
    );
};

export default TeamForm;
