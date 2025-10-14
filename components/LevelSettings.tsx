
import React, { useState } from 'react';
import { HitterIdentity, HitterIdentitySetting, HitterLevelSetting } from '../types';
import { mockIdentitySettings, mockHitterLevelSettings, mockBossLevelSettings, allProducts } from '../mockData';
import Card from './Card';
import CloseIcon from './icons/CloseIcon';

const IdentityLevelSettings: React.FC = () => {
    const [identitySettings, setIdentitySettings] = useState<HitterIdentitySetting[]>(mockIdentitySettings);
    const [hitterLevels, setHitterLevels] = useState<HitterLevelSetting[]>(mockHitterLevelSettings);
    const [bossLevels, setBossLevels] = useState<HitterLevelSetting[]>(mockBossLevelSettings);

    const handleSave = () => {
        alert("身份与等级设置已保存！");
        console.log({ identitySettings, hitterLevels, bossLevels });
    };
    
    // A generic handler for changing properties in an array of settings
    const handleSettingChange = <T extends {}>(
        setter: React.Dispatch<React.SetStateAction<T[]>>, 
        index: number, 
        field: keyof T, 
        value: any
    ) => {
        setter(prev => {
            const newSettings = [...prev];
            newSettings[index] = { ...newSettings[index], [field]: value };
            return newSettings;
        });
    };

    return (
        <div className="space-y-8">
            {/* Hitter Identity Settings */}
            <div>
                <h3 className="text-xl font-semibold mb-4">打手身份设置</h3>
                <Card>
                    <div className="space-y-4">
                        {identitySettings.map((setting, index) => (
                            <div key={setting.identity} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 bg-dark-bg rounded-lg">
                                <span className="font-semibold text-brand-secondary">{setting.name}</span>
                                <div>
                                    <label className="text-xs text-dark-text-secondary block mb-1">认证商品</label>
                                    <select 
                                        value={setting.requiredProductId || ''} 
                                        onChange={(e) => handleSettingChange(setIdentitySettings, index, 'requiredProductId', e.target.value)}
                                        className="w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                    >
                                        <option value="">无</option>
                                        {allProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label className="text-xs text-dark-text-secondary block mb-1">头像底部图标URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://.../icon.png"
                                        value={setting.iconUrl}
                                        onChange={(e) => handleSettingChange(setIdentitySettings, index, 'iconUrl', e.target.value)}
                                        className="w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Hitter Level Settings */}
            <div>
                <h3 className="text-xl font-semibold mb-4">打手等级设置</h3>
                <Card>
                    <div className="space-y-2">
                         {hitterLevels.map((level, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 bg-dark-bg rounded-lg">
                                <input type="text" value={level.name} onChange={e => handleSettingChange(setHitterLevels, index, 'name', e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-md py-1 px-2 text-sm" />
                                <input type="number" value={level.requiredIncome} onChange={e => handleSettingChange(setHitterLevels, index, 'requiredIncome', Number(e.target.value))} className="w-full bg-dark-bg border border-dark-border rounded-md py-1 px-2 text-sm" placeholder="所需创收" />
                                <div className="flex items-center gap-2">
                                    <input type="text" value={level.haloColor} onChange={e => handleSettingChange(setHitterLevels, index, 'haloColor', e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-md py-1 px-2 text-sm" placeholder="光环颜色 (#FFFFFF)" />
                                    <div className="w-6 h-6 rounded-full border border-dark-border" style={{ backgroundColor: level.haloColor }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            
             {/* Boss Level Settings */}
            <div>
                <h3 className="text-xl font-semibold mb-4">老板等级设置</h3>
                 <Card>
                    <div className="space-y-2">
                         {bossLevels.map((level, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-3 bg-dark-bg rounded-lg">
                                <input type="text" value={level.name} onChange={e => handleSettingChange(setBossLevels, index, 'name', e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-md py-1 px-2 text-sm" />
                                <input type="number" value={level.requiredIncome} onChange={e => handleSettingChange(setBossLevels, index, 'requiredIncome', Number(e.target.value))} className="w-full bg-dark-bg border border-dark-border rounded-md py-1 px-2 text-sm" placeholder="所需成长值" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="flex justify-end mt-8">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    保存所有设置
                </button>
            </div>
        </div>
    );
};

export default IdentityLevelSettings;
