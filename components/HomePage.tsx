
import React, { useState } from 'react';
import { UserRole, Product } from '../types';
import Card from './Card';

interface HomePageProps {
  currentUserRole: UserRole;
}

const mockHotSales: Product[] = [
  { id: '1', name: '大师级陪练', price: 50, image: 'https://picsum.photos/seed/hotsale1/300/200', sales: 1200, category: '陪练' },
  { id: '2', name: '极速上分套餐', price: 100, image: 'https://picsum.photos/seed/hotsale2/300/200', sales: 950, category: '上分' },
  { id: '3', name: '团队开黑语音', price: 20, image: 'https://picsum.photos/seed/hotsale3/300/200', sales: 2500, category: '语音' },
];

const mockNewbieTrials: Product[] = [
  { id: '4', name: '新手体验陪练', price: 5, image: 'https://picsum.photos/seed/newbie1/300/200', sales: 800, category: '新手试炼' },
  { id: '5', name: '首单优惠上分', price: 10, image: 'https://picsum.photos/seed/newbie2/300/200', sales: 650, category: '新手试炼' },
];

const BossCard: React.FC = () => (
  <Card>
    <h3 className="font-bold text-lg text-brand-secondary">老板卡片</h3>
    <p className="text-sm text-dark-text-secondary mt-2">等级: 尊贵VIP 5</p>
    <p className="text-sm text-dark-text-secondary">装饰: 黄金龙王</p>
    <button className="mt-4 w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors">
      提升等级
    </button>
  </Card>
);

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


const HomePage: React.FC<HomePageProps> = ({ currentUserRole }) => {
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
            <div key={item.id} className="text-center">
              <img src={item.image} alt={item.name} className="w-full h-20 object-cover rounded-lg" />
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
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-t-lg" />
              <div className="p-3">
                <h4 className="font-semibold truncate">{item.name}</h4>
                <p className="text-lg font-bold text-red-400 mt-1">{item.price}元</p>
                <button className="mt-2 w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors">
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
