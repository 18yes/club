import React, { useState } from 'react';
import Card from './Card';
import CloseIcon from './icons/CloseIcon';

const LevelManager: React.FC<{ title: string, initialLevels: string[] }> = ({ title, initialLevels }) => {
    const [levels, setLevels] = useState(initialLevels);
    const [newLevel, setNewLevel] = useState('');

    const handleAddLevel = () => {
        if (newLevel.trim() && !levels.includes(newLevel.trim())) {
            setLevels([...levels, newLevel.trim()]);
            setNewLevel('');
        }
    };
    
    const handleRemoveLevel = (levelToRemove: string) => {
        setLevels(levels.filter(level => level !== levelToRemove));
    };

    return (
        <Card>
            <h4 className="font-semibold text-brand-secondary mb-4">{title}</h4>
            <div className="space-y-2 mb-4">
                {levels.map(level => (
                    <div key={level} className="flex items-center justify-between bg-dark-bg p-2 rounded-md">
                        <span>{level}</span>
                        <button onClick={() => handleRemoveLevel(level)} className="p-1 rounded-full hover:bg-dark-border">
                           <CloseIcon />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    placeholder="添加新等级..."
                    className="flex-grow bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
                <button onClick={handleAddLevel} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">
                    添加
                </button>
            </div>
        </Card>
    )
}

const LevelSettings: React.FC = () => {
    const [vipSettings, setVipSettings] = useState({
        waitTime: '30',
        superWaitTime: '15'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVipSettings(prev => ({...prev, [name]: value}));
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">等级设置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LevelManager title="老板等级名称" initialLevels={['1级老板', '2级老板', '3级老板']} />
                <LevelManager title="打手等级名称" initialLevels={['1级打手', '2级打手', '3级打手']} />
            </div>
             <Card>
                <h4 className="font-semibold text-brand-secondary mb-4">VIP打手设置</h4>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="waitTime" className="block text-sm font-medium text-dark-text-secondary">VIP打手等待时长 (秒)</label>
                        <input
                            type="number"
                            id="waitTime"
                            name="waitTime"
                            value={vipSettings.waitTime}
                            onChange={handleChange}
                            className="mt-1 block w-full max-w-xs bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                        />
                    </div>
                     <div>
                        <label htmlFor="superWaitTime" className="block text-sm font-medium text-dark-text-secondary">超级VIP打手等待时长 (秒)</label>
                        <input
                            type="number"
                            id="superWaitTime"
                            name="superWaitTime"
                            value={vipSettings.superWaitTime}
                            onChange={handleChange}
                            className="mt-1 block w-full max-w-xs bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                        />
                    </div>
                </div>
            </Card>
            <div className="flex justify-end mt-6">
                <button
                    className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    保存等级设置
                </button>
            </div>
        </div>
    );
};

export default LevelSettings;
