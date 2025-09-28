import React, { useState, useEffect } from 'react';
import { Announcement } from '../types';

interface AnnouncementFormProps {
    announcement: Partial<Announcement> | null;
    onSave: (announcement: Partial<Announcement>) => void;
    onClose: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ announcement, onSave, onClose }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (announcement) {
            setContent(announcement.content || '');
        }
    }, [announcement]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) {
            alert('公告内容不能为空。');
            return;
        }
        onSave({ ...announcement, content });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brand-secondary">
                {announcement?.id ? '编辑公告' : '新增公告'}
            </h2>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-dark-text-secondary">公告内容</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                ></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">保存公告</button>
            </div>
        </form>
    );
};

export default AnnouncementForm;
