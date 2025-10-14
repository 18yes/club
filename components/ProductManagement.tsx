
import React, { useState } from 'react';
import { Product } from '../types';
import Modal from './Modal';
import ProductForm from './ProductForm';
import { allProducts } from '../mockData';

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(allProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

    const handleAddNewClick = () => {
        setEditingProduct({});
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (productId: string) => {
        if (window.confirm('您确定要删除该商品吗？')) {
            setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
        }
    };

    const handleSaveProduct = (productToSave: Partial<Product>) => {
        if (productToSave.id) {
            // Edit existing product
            setProducts(currentProducts =>
                currentProducts.map(p => (p.id === productToSave.id ? (productToSave as Product) : p))
            );
        } else {
            // Add new product
            const newProduct: Product = {
                ...productToSave,
                id: `P${Date.now()}`,
                sales: 0, // New products start with 0 sales
            } as Product;
            setProducts(currentProducts => [newProduct, ...currentProducts]);
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">商品管理</h3>
                <button
                    onClick={handleAddNewClick}
                    className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
                >
                    添加新商品
                </button>
            </div>

            <div className="bg-dark-card shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">商品</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">分类</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">价格</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">销量</th>
                            <th className="px-5 py-3 border-b-2 border-dark-border bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-dark-border">
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-16 h-12 bg-dark-bg rounded-md">
                                            {product.images && product.images.length > 0 && (
                                                <img className="w-full h-full rounded-md object-cover" src={product.images[0]} alt={product.name} />
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-dark-text-primary whitespace-no-wrap font-semibold">{product.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="text-dark-text-primary whitespace-no-wrap">{product.category}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="text-red-400 font-bold whitespace-no-wrap">¥{product.price.toFixed(2)}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm">
                                    <p className="text-dark-text-primary whitespace-no-wrap">{product.sales}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-dark-border text-sm space-x-2 whitespace-no-wrap">
                                    <button onClick={() => handleEditClick(product)} className="text-blue-400 hover:underline">编辑</button>
                                    <button onClick={() => handleDeleteClick(product.id)} className="text-red-400 hover:underline">删除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <ProductForm
                        product={editingProduct}
                        onSave={handleSaveProduct}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ProductManagement;