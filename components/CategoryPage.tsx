
import React, { useState } from 'react';
import { Product } from '../types';
import Card from './Card';

interface CategoryPageProps {
  onProductSelect: (product: Product) => void;
}

const allProducts: Product[] = [
  { id: '1', name: '大师级陪练', price: 50, image: 'https://picsum.photos/seed/cat1/300/200', sales: 1200, category: '技能陪练', description: '由顶尖大师级玩家提供一对一陪练服务，快速提升您的游戏技巧和意识。' },
  { id: '2', name: '极速上分套餐', price: 100, image: 'https://picsum.photos/seed/cat2/300/200', sales: 950, category: '段位提升', description: '专业团队为您提供高效的上分服务，安全可靠，助您轻松达到理想段位。' },
  { id: '3', name: '团队开黑语音', price: 20, image: 'https://picsum.photos/seed/cat3/300/200', sales: 2500, category: '语音互动', description: '加入我们的语音频道，与队友实时沟通，享受团队游戏的乐趣。' },
  { id: '4', name: '大神带队通关', price: 80, image: 'https://picsum.photos/seed/cat4/300/200', sales: 700, category: '副本攻略', description: '资深玩家带队，轻松攻克高难度副本，获取稀有装备。' },
  { id: '5', name: '娱乐休闲匹配', price: 15, image: 'https://picsum.photos/seed/cat5/300/200', sales: 3000, category: '技能陪练', description: '轻松愉快的游戏体验，大神陪你聊天、玩游戏，告别孤单。' },
  { id: '6', name: '王者晋级赛', price: 120, image: 'https://picsum.photos/seed/cat6/300/200', sales: 500, category: '段位提升', description: '关键的晋级赛，我们保证100%成功率，让您稳操胜券。' },
];

const categories = ['全部', '技能陪练', '段位提升', '语音互动', '副本攻略'];

const CategoryPage: React.FC<CategoryPageProps> = ({ onProductSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredProducts = selectedCategory === '全部'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4">
      <div className="w-full h-24 bg-dark-card rounded-lg flex items-center justify-center mb-4">
        <p className="text-dark-text-secondary">广告位 2</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-4 mb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-brand-primary text-white'
                : 'bg-dark-card text-dark-text-secondary hover:bg-dark-border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map(item => (
          <Card key={item.id} padding="p-0">
            <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-t-lg" />
            <div className="p-3">
              <h4 className="font-semibold truncate">{item.name}</h4>
              <p className="text-sm text-dark-text-secondary">{item.sales}人已购</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-bold text-red-400">{item.price}元</p>
                <button
                  onClick={() => onProductSelect(item)}
                  className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors">
                  下单
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
