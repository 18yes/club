
import React, { useState } from 'react';
import { UserRole, Product } from '../types';
import Card from './Card';
import { allProducts } from '../mockData';

interface HomePageProps {
  currentUserRole: UserRole;
  onProductSelect: (product: Product) => void;
}

const mockHotSales: Product[] = allProducts.slice(0, 3);
const mockNewbieTrials: Product[] = allProducts.slice(3, 5);


const BossCard: React.FC = () => {
  const currentGrowth = 19308;
  const targetGrowth = 50000;
  const progressPercentage = (currentGrowth / targetGrowth) * 100;

  return (
    // Add top margin to make space for the avatar that overflows the card
    <div className="relative mt-10">
      <Card className="relative overflow-visible pt-12 text-center">
        {/* Avatar positioned absolutely relative to the card */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <img
            src="https://picsum.photos/seed/boss-user/200" // A consistent placeholder
            alt="用户头像"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-dark-card"
          />
        </div>

        {/* User Name and Level Badge */}
        <div className="flex justify-center items-center gap-3">
          <h3 className="text-2xl font-bold">景彡子hǎorěn</h3>
          <div className="bg-dark-border px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-1 shadow-sm">
            <span className="font-bold text-yellow-400 text-base">V</span>
            <span>钻石老板</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 px-2">
          <div className="flex justify-between items-center text-xs text-dark-text-secondary mb-1">
            <span>钻石老板</span>
            <span>至尊老板</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-5 relative overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            >
            </div>
             <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {progressPercentage.toFixed(3)}%
             </span>
          </div>
        </div>

        {/* Growth Details */}
        <div className="mt-4 text-sm text-dark-text-secondary space-y-1">
          <p>
            当前等级: 钻石老板 (<span className="text-brand-secondary cursor-pointer hover:underline">查看权益</span>) 当前成长值: <span className="text-dark-text-primary font-semibold">{currentGrowth}</span>
          </p>
          <p>
            达到 <span className="text-dark-text-primary font-semibold">{targetGrowth}</span> 成长值升至 至尊老板 (<span className="text-brand-secondary cursor-pointer hover:underline">查看权益</span>)
          </p>
        </div>
      </Card>
    </div>
  );
};

const HitterCard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <Card>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-brand-secondary">打手卡片</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {isOnline ? '在线接单' : '离线休息'}
          </span>
          <button onClick={() => setIsOnline(!isOnline)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isOnline ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="bg-dark-bg p-2 rounded-lg">
          <p className="text-sm font-semibold">最新订单: <span className="text-brand-secondary">等待分配</span></p>
          <button className="text-xs text-blue-400 hover:underline">申请VIP解锁更多</button>
        </div>
        <div className="bg-dark-bg p-2 rounded-lg">
          <p className="text-sm font-semibold">悬赏信息: <span className="text-yellow-400">3个新悬赏</span></p>
          <button className="text-xs text-blue-400 hover:underline">前往接悬赏</button>
        </div>
      </div>
    </Card>
  );
};


const HomePage: React.FC<HomePageProps> = ({ currentUserRole, onProductSelect }) => {
  return (
    <div className="container mx-auto px-4 space-y-6">
      <Card>
        <h3 className="font-semibold text-yellow-400">系统公告</h3>
        <p className="text-sm mt-1 text-dark-text-secondary">平台将于午夜进行系统维护，请提前安排好您的订单。</p>
      </Card>
      
      {currentUserRole === UserRole.Boss ? <BossCard /> : <HitterCard />}
      
      <div className="w-full h-32 bg-dark-card rounded-lg flex items-center justify-center">
        <p className="text-dark-text-secondary">广告位 1</p>
      </div>

      <Card>
        <h3 className="font-bold text-lg text-center text-brand-secondary">热销榜</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {mockHotSales.map((item, index) => (
            <div key={item.id} className="text-center cursor-pointer" onClick={() => onProductSelect(item)}>
              <img src={item.images[0]} alt={item.name} className="w-full h-20 object-cover rounded-lg" />
              <p className="text-sm font-semibold mt-2 truncate">TOP {index + 1}: {item.name}</p>
              <p className="text-xs text-red-400">{item.price}元</p>
            </div>
          ))}
        </div>
      </Card>
      
      <div>
        <h2 className="text-xl font-bold mb-4">新手试炼</h2>
        <div className="grid grid-cols-2 gap-4">
          {mockNewbieTrials.map(item => (
            <Card key={item.id} padding="p-0">
              <img src={item.images[0]} alt={item.name} className="w-full h-24 object-cover rounded-t-lg" />
              <div className="p-3">
                <h4 className="font-semibold truncate">{item.name}</h4>
                <p className="text-lg font-bold text-red-400 mt-1">{item.price}元</p>
                <button
                  onClick={() => onProductSelect(item)}
                  className="mt-2 w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors">
                  下单
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
