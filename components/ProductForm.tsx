
import React, { useState, useEffect } from 'react';
import { Product, HitterIdentity } from '../types';

interface ProductFormProps {
    product: Partial<Product> | null;
    onSave: (product: Partial<Product>) => void;
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: '',
        price: 0,
        description: '',
        images: [],
        grantsIdentity: HitterIdentity.None,
        serviceFee: 5,
    });

    useEffect(() => {
        if (product) {
            const initialData = { ...formData, ...product };
            if (!Array.isArray(initialData.images)) {
                initialData.images = [];
            }
            setFormData(initialData);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'serviceFee' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const imagesArray = value.split('\n').map(url => url.trim()).filter(Boolean);
        setFormData(prev => ({
            ...prev,
            images: imagesArray,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.price || formData.price <= 0) {
            alert('请填写所有必填字段并确保价格为正数。');
            return;
        }
        if (formData.serviceFee && (formData.serviceFee < 1 || formData.serviceFee > 50)) {
            alert('平台服务费必须在1%到50%之间。');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            <h2 className="text-xl font-bold text-center text-brand-secondary">
                {product?.id ? '编辑商品' : '添加新商品'}
            </h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-text-secondary">商品名称</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-dark-text-secondary">分类</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-dark-text-secondary">价格 (元)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price || 0}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
            </div>

             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="grantsIdentity" className="block text-sm font-medium text-dark-text-secondary">获得身份</label>
                    <select
                      id="grantsIdentity"
                      name="grantsIdentity"
                      value={formData.grantsIdentity || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    >
                      <option value={HitterIdentity.None}>不授予身份</option>
                      {Object.values(HitterIdentity).filter(i => i !== HitterIdentity.None).map(identity => (
                        <option key={identity} value={identity}>{identity}</option>
                      ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="serviceFee" className="block text-sm font-medium text-dark-text-secondary">平台服务费 (%)</label>
                    <input
                        type="number"
                        id="serviceFee"
                        name="serviceFee"
                        value={formData.serviceFee || 0}
                        onChange={handleChange}
                        min="1"
                        max="50"
                        className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="images" className="block text-sm font-medium text-dark-text-secondary">图片链接 (每行一个)</label>
                <textarea
                    id="images"
                    name="images"
                    value={formData.images?.join('\n') || ''}
                    onChange={handleImagesChange}
                    rows={3}
                    placeholder="https://example.com/image1.png&#10;https://example.com/image2.png"
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-dark-text-secondary">商品描述</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                ></textarea>
            </div>


            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">保存商品</button>
            </div>
        </form>
    );
};

export default ProductForm;
