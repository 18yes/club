
import React, { useState } from 'react';
import Card from './Card';
import NamingSettings from './NamingSettings';
import IdentityLevelSettings from './LevelSettings';

type SettingsTab = 'naming' | 'identityLevels' | 'platform';


const PlatformSettings: React.FC = () => {
    const [withdrawalFee, setWithdrawalFee] = useState(5); // Default 5%

    const handleSave = () => {
        alert('平台参数已保存！');
        console.log('Saving platform settings:', { withdrawalFee });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">平台参数设置</h3>
            <Card>
                <h4 className="font-semibold text-brand-secondary mb-4">提现手续费</h4>
                <div>
                    <label htmlFor="withdrawalFee" className="block text-sm font-medium text-dark-text-secondary">手续费率 (%)</label>
                    <input
                        type="number"
                        id="withdrawalFee"
                        name="withdrawalFee"
                        value={withdrawalFee}
                        onChange={(e) => setWithdrawalFee(Number(e.target.value))}
                        min="0"
                        max="100"
                        className="mt-1 block w-full max-w-xs bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
            </Card>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    保存参数
                </button>
            </div>
        </div>
    );
}

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('identityLevels');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'naming':
                return <NamingSettings />;
            case 'identityLevels':
                return <IdentityLevelSettings />;
            case 'platform':
                return <PlatformSettings />;
            default:
                 return <p className="text-dark-text-secondary">请选择一个标签页。</p>;
        }
    };

    const TabButton: React.FC<{tab: SettingsTab; label: string}> = ({tab, label}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                ? 'bg-brand-primary text-white' 
                : 'text-dark-text-secondary hover:bg-dark-border'
            }`}
        >
            {label}
        </button>
    )

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">后台设置</h2>
            <Card>
                <div className="border-b border-dark-border mb-4 pb-4">
                    <div className="flex space-x-2">
                       <TabButton tab="naming" label="名称设置" />
                       <TabButton tab="identityLevels" label="身份与等级" />
                       <TabButton tab="platform" label="平台参数" />
                    </div>
                </div>
                <div>
                    {renderTabContent()}
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
