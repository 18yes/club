import React, { useState } from 'react';
import { User } from '../types';
import CoinIcon from './icons/CoinIcon';

interface BalanceRechargePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

const BalanceRechargePage: React.FC<BalanceRechargePageProps> = ({ user, onUpdateUser, onBack }) => {
    const presetAmounts = [10, 50, 100, 500];
    const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(500);
    const [customAmount, setCustomAmount] = useState('');

    const handleConfirmRecharge = () => {
        const amountToRecharge = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;

        if (isNaN(amountToRecharge) || amountToRecharge <= 0) {
            alert('请输入有效的充值金额。');
            return;
        }

        const updatedUser: User = {
            ...user,
            balance: user.balance + amountToRecharge,
        };
        
        onUpdateUser(updatedUser);
        alert(`成功充值 ${amountToRecharge} 元！`);
        onBack();
    };
    
    const AmountButton: React.FC<{amount: number | 'custom', subLabel: string, isRecommended?: boolean}> = ({ amount, subLabel, isRecommended }) => {
        const isSelected = selectedAmount === amount;
        
        const mainLabel = typeof amount === 'number' ? amount : '自定义';
        
        return (
            <div className="relative">
                 {isRecommended && (
                    <div className="absolute -top-2 left-1 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-sm z-10">
                        推荐
                    </div>
                 )}
                 <button
                    onClick={() => {
                        setSelectedAmount(amount);
                        if(amount !== 'custom') setCustomAmount('');
                    }}
                    className={`w-full h-24 bg-dark-card rounded-lg flex flex-col items-center justify-center transition-all border-2 shadow-md
                        ${isSelected ? 'border-brand-primary' : 'border-dark-border hover:border-dark-text-secondary'}
                    `}
                >
                    <div className="flex items-center space-x-1">
                        <span className="text-2xl font-bold">{mainLabel}</span>
                         {typeof amount === 'number' && <CoinIcon className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <span className="text-sm text-dark-text-secondary mt-1">{subLabel}</span>
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg text-dark-text-primary">
            <header className="bg-dark-card p-4 shadow-sm flex items-center relative sticky top-0 z-50 border-b border-dark-border">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-dark-border transition-colors" aria-label="返回">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold text-dark-text-primary text-center absolute w-full left-0 pointer-events-none">余额充值</h1>
            </header>

            <div className="p-6 space-y-8">
                <div className="flex items-center space-x-2 text-lg">
                    <CoinIcon className="w-6 h-6 text-yellow-400" />
                    <span className="text-dark-text-secondary">余额:</span>
                    <span className="font-bold text-red-500 text-2xl">{user.balance.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {presetAmounts.map(amount => (
                        <AmountButton key={amount} amount={amount} subLabel={`${amount}元`} isRecommended={amount === 500} />
                    ))}
                    <AmountButton amount="custom" subLabel="自定义充值" />
                </div>
                
                {selectedAmount === 'custom' && (
                    <div className="pt-2">
                        <input
                            id="customAmount"
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="自定义充值金额"
                            className="w-full bg-dark-card border border-dark-border rounded-lg py-3 px-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                )}
                
                <div className="pt-8 space-y-4">
                    <button 
                        onClick={handleConfirmRecharge}
                        className="w-full bg-[#ef6262] hover:bg-[#e05858] text-white font-bold py-3 px-4 rounded-full transition-colors text-lg shadow-lg"
                    >
                        确定充值
                    </button>
                     <button 
                        onClick={() => alert('此功能暂未开放')}
                        className="w-full bg-[#5cb85c] hover:bg-[#4c9a4c] text-white font-bold py-3 px-4 rounded-full transition-colors text-lg shadow-lg"
                    >
                        余额明细
                    </button>
                    <button 
                        onClick={() => alert('此功能暂未开放')}
                        className="w-full bg-[#337ab7] hover:bg-[#286090] text-white font-bold py-3 px-4 rounded-full transition-colors text-lg shadow-lg"
                    >
                        余额提现
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BalanceRechargePage;