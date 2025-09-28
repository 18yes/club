
import React from 'react';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      <header className="bg-dark-card p-4 shadow-md flex items-center sticky top-0 z-50 border-b border-dark-border">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-dark-border transition-colors" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-brand-secondary">商品详情</h1>
      </header>

      <div>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold text-red-400">¥{product.price}</p>
          <p className="text-sm text-dark-text-secondary">{product.sales}人已购买</p>
        </div>
        
        <div className="bg-dark-card p-4 rounded-lg">
          <h3 className="font-semibold mb-2">商品描述</h3>
          <p className="text-dark-text-secondary text-sm leading-relaxed">{product.description}</p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-dark-card border-t border-dark-border">
        <button className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
          立即购买
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
