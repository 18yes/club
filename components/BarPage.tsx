
import React, { useState, useCallback } from 'react';
import { Bounty, BountyStatus } from '../types';
import Card from './Card';
import Modal from './Modal';
import SparklesIcon from './icons/SparklesIcon';
import { generateBountyDescription } from '../services/geminiService';

const mockBounties: Bounty[] = [
  { id: '1', title: '急求大神带过最终BOSS', description: '卡关一天了，来个强力输出，酬金丰厚！', reward: 200, status: BountyStatus.InProgress, participants: 2, maxParticipants: 3 },
  { id: '2', title: '五排车队缺一辅助', description: '来个会玩的辅助，心态好，不压力。', reward: 50, status: BountyStatus.InProgress, participants: 4, maxParticipants: 5 },
  { id: '3', title: '新赛季开荒团', description: '招募长期队友一起开荒，要求时间稳定。', reward: 100, status: BountyStatus.Completed, participants: 5, maxParticipants: 5 },
];

const BountyForm: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateDesc = async () => {
        if (!title.trim()) {
            alert('请先输入悬赏标题');
            return;
        }
        setIsGenerating(true);
        const generatedDesc = await generateBountyDescription(title);
        setDescription(generatedDesc);
        setIsGenerating(false);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brand-secondary">发布悬赏</h2>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-dark-text-secondary">悬赏标题</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-dark-text-secondary">悬赏描述</label>
                <div className="relative">
                    <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                    <button
                        onClick={handleGenerateDesc}
                        disabled={isGenerating}
                        className="absolute bottom-2 right-2 flex items-center space-x-1 px-2 py-1 text-xs rounded-md bg-brand-primary hover:bg-brand-secondary disabled:bg-gray-500 transition-colors"
                    >
                        <SparklesIcon />
                        <span>{isGenerating ? '生成中...' : 'AI生成'}</span>
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="reward" className="block text-sm font-medium text-dark-text-secondary">悬赏金额 (元)</label>
                <input type="number" id="reward" value={reward} onChange={(e) => setReward(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">发布</button>
            </div>
        </div>
    );
};

const BarPage: React.FC = () => {
  const [bounties, setBounties] = useState<Bounty[]>(mockBounties);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-brand-secondary">悬赏公告</h2>
            <button onClick={openModal} className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-secondary transition-colors font-semibold">发布悬赏</button>
        </div>
      
        <div className="space-y-4">
            {bounties.map(bounty => (
                <Card key={bounty.id}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">{bounty.title}</h3>
                            <p className="text-sm text-dark-text-secondary mt-1">{bounty.description}</p>
                        </div>
                        <span className={`text-2xl font-bold ${bounty.status === BountyStatus.InProgress ? 'text-yellow-400' : 'text-green-400'}`}>
                            ¥{bounty.reward}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-2 border-t border-dark-border">
                        <div className="text-sm text-dark-text-secondary">
                            <span className={bounty.status === BountyStatus.InProgress ? 'text-blue-400' : 'text-gray-500'}>{bounty.status}</span> | 报名: {bounty.participants}/{bounty.maxParticipants}
                        </div>
                        {bounty.status === BountyStatus.InProgress && (
                            <button className="px-3 py-1 text-sm rounded-lg bg-green-600 hover:bg-green-500 transition-colors">报名</button>
                        )}
                    </div>
                </Card>
            ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <BountyForm onClose={closeModal} />
        </Modal>
    </div>
  );
};

export default BarPage;
