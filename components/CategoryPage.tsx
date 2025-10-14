
import React, { useState } from 'react';
import { Product } from '../types';
import Card from './Card';
import { allProducts } from '../mockData';

interface CategoryPageProps {
  onProductSelect: (product: Product) => void;
}

const categories = ['全部', '技能陪练', '段位提升', '语音互动', '副本攻略', 'VIP打手认证', '打手考核'];

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
            <img src={item.images[0]} alt={item.name} className="w-full h-24 object-cover rounded-t-lg" />
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