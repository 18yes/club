
import React, { useState } from 'react';
import { User } from '../types';
import CoinIcon from './icons/CoinIcon';

interface DepositRechargePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

const DepositRechargePage: React.FC<DepositRechargePageProps> = ({ user, onUpdateUser, onBack }) => {
    const presetAmounts = [10, 50, 100, 500];
    const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(500);
    const [customAmount, setCustomAmount] = useState('');

    const handleConfirmRecharge = () => {
        const amountToRecharge = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;

        if (isNaN(amountToRecharge) || amountToRecharge <= 0) {
            alert('请输入有效的充值金额。');
            return;
        }

        if (user.balance < amountToRecharge) {
            alert('您的可用余额不足。');
            return;
        }

        const updatedUser: User = {
            ...user,
            balance: user.balance - amountToRecharge,
            deposit: user.deposit + amountToRecharge,
        };
        
        onUpdateUser(updatedUser);
        alert(`成功充值保证金 ${amountToRecharge} 元！`);
        onBack();
    };
    
    const AmountButton: React.FC<{amount: number | 'custom', label: string, isRecommended?: boolean}> = ({ amount, label, isRecommended }) => {
        const isSelected = selectedAmount === amount;
        return (
            <div className="relative">
                 <button
                    onClick={() => {
                        setSelectedAmount(amount);
                        if(amount !== 'custom') setCustomAmount('');
                    }}
                    className={`w-full h-24 bg-dark-card rounded-lg flex flex-col items-center justify-center transition-all border-2
                        ${isSelected ? 'border-brand-primary' : 'border-dark-border hover:border-dark-text-secondary'}
                    `}
                >
                    <div className="flex items-center space-x-1">
                        <span className="text-2xl font-bold">{typeof amount === 'number' ? amount : '自定义'}</span>
                         {typeof amount === 'number' && <CoinIcon className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <span className="text-sm text-dark-text-secondary mt-1">{label}</span>
                </button>
                 {isRecommended && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-semibold px-2 py-0.5 rounded-md">
                        推荐
                    </div>
                 )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg">
            <header className="bg-dark-card p-4 shadow-md flex items-center sticky top-0 z-50 border-b border-dark-border">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-dark-border transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-dark-text-primary">保证金充值</h1>
            </header>

            <div className="p-4 space-y-8">
                <div className="flex items-center space-x-2 text-lg">
                    <CoinIcon className="w-6 h-6 text-yellow-400" />
                    <span className="text-dark-text-secondary">保证金:</span>
                    <span className="font-bold text-rose-500">{user.deposit.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {presetAmounts.map(amount => (
                        <AmountButton key={amount} amount={amount} label={`${amount}元`} isRecommended={amount === 500} />
                    ))}
                    <AmountButton amount="custom" label="自定义充值" />
                </div>
                
                {selectedAmount === 'custom' && (
                    <div>
                         <label htmlFor="customAmount" className="block text-sm font-medium text-dark-text-secondary mb-2">输入自定义金额</label>
                        <input
                            id="customAmount"
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="请输入充值金额"
                            className="w-full bg-dark-card border border-dark-border rounded-lg py-3 px-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                )}
                
                <div className="pt-4 space-y-3">
                    <button 
                        onClick={handleConfirmRecharge}
                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                    >
                        确定充值
                    </button>
                     <button 
                        onClick={() => alert('此功能暂未开放')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                    >
                        使用“单抵”渠道充值保证金
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositRechargePage;
