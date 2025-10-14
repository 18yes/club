
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = product.images && product.images.length > 0;

  const goToPrevious = () => {
    if (!hasImages) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (!hasImages) return;
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

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

      <div className="relative w-full h-64 bg-dark-card">
        {hasImages ? (
          <>
            <img 
              src={product.images[currentIndex]} 
              alt={`${product.name} - slide ${currentIndex + 1}`} 
              className="w-full h-full object-cover" 
            />
            {product.images.length > 1 && (
                <>
                    {/* Left Arrow */}
                    <button 
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-opacity"
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button 
                        onClick={goToNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-opacity"
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {product.images.map((_, slideIndex) => (
                            <button
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                    currentIndex === slideIndex ? 'bg-brand-primary' : 'bg-gray-400 bg-opacity-70'
                                }`}
                                aria-label={`Go to slide ${slideIndex + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-dark-text-secondary">无可用图片</p>
          </div>
        )}
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