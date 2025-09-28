import React, { useState } from 'react';
import Card from './Card';

const NamingSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        platformName: '俱乐部平台',
        homeModule: '首页',
        categoryModule: '分类',
        barModule: '酒吧',
        profileModule: '我的',
        bossRole: '老板',
        hitterRole: '打手',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({...prev, [name]: value}));
    };

    const handleSave = () => {
        // In a real app, you'd call an API here.
        alert('设置已保存！');
        console.log('Saving settings:', settings);
    }
    
    const renderInput = (label: string, name: keyof typeof settings, value: string) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-dark-text-secondary">{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
        </div>
    );

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">名称设置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-brand-secondary">平台及模块名称</h4>
                        {renderInput('平台名称', 'platformName', settings.platformName)}
                        {renderInput('模块1名称', 'homeModule', settings.homeModule)}
                        {renderInput('模块2名称', 'categoryModule', settings.categoryModule)}
                        {renderInput('模块3名称', 'barModule', settings.barModule)}
                        {renderInput('模块4名称', 'profileModule', settings.profileModule)}
                    </div>
                </Card>
                 <Card>
                    <div className="space-y-4">
                         <h4 className="font-semibold text-brand-secondary">角色名称</h4>
                        {renderInput('角色1名称', 'bossRole', settings.bossRole)}
                        {renderInput('角色2名称', 'hitterRole', settings.hitterRole)}
                    </div>
                </Card>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    保存设置
                </button>
            </div>
        </div>
    );
};

export default NamingSettings;
