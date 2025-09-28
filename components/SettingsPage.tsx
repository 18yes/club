import React, { useState } from 'react';
import Card from './Card';
import NamingSettings from './NamingSettings';
import LevelSettings from './LevelSettings';

type SettingsTab = 'naming' | 'levels' | 'platform' | 'other';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('naming');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'naming':
                return <NamingSettings />;
            case 'levels':
                return <LevelSettings />;
            case 'platform':
                return <p className="text-dark-text-secondary">平台核心业务参数配置。</p>;
            default:
                return <p className="text-dark-text-secondary">其他设置待添加。</p>;
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
                <div className="border-b border-dark-border mb-4">
                    <div className="flex space-x-4">
                       <TabButton tab="naming" label="名称设置" />
                       <TabButton tab="levels" label="等级名称设置" />
                       <TabButton tab="platform" label="平台配置" />
                       <TabButton tab="other" label="其他" />
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
