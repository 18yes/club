
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Bounty, BountyStatus, User, Product, Order, OrderStatus } from '../types';
import Card from './Card';
import Modal from './Modal';
import SparklesIcon from './icons/SparklesIcon';
import SearchIcon from './icons/SearchIcon';
import { generateBountyDescription } from '../services/geminiService';
import { allProducts, allBounties, allUsers, allOrders } from '../mockData';
import OrderDetailModal from './OrderDetailModal';

const vipProducts = allProducts.filter(p => p.specialType === 'vip_certification');
const assessmentProducts = allProducts.filter(p => p.specialType === 'assessment');
const mockUserForPurchase = allUsers.find(u => u.id === '2'); // Using '大神_001' for purchase logic.

interface BountyFormProps {
    onClose: () => void;
    onAddBounty: (bountyData: { title: string; description: string; reward: number; platform: 'mobile' | 'pc' }) => void;
}

const BountyForm: React.FC<BountyFormProps> = ({ onClose, onAddBounty }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [platform, setPlatform] = useState<'mobile' | 'pc'>('mobile');

    const handleGenerateDesc = async () => {
        if (!title.trim()) {
            alert('请先输入悬赏标题');
            return;
        }
        setIsGenerating(true);
        const generatedDesc = await generateBountyDescription(title);
        setDescription(generatedDesc);
        setIsGenerating(false);
    };

    const handleSubmit = () => {
        const rewardValue = parseInt(reward, 10);
        if (!title.trim() || !description.trim() || isNaN(rewardValue) || rewardValue <= 0) {
            alert('请完整填写所有字段，并确保悬赏金额为正数。');
            return;
        }
        
        onAddBounty({
            title,
            description,
            reward: rewardValue,
            platform,
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brand-secondary">发布悬赏</h2>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-dark-text-secondary">悬赏标题</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
                <label className="block text-sm font-medium text-dark-text-secondary">订单属性</label>
                 <div className="mt-2 flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="platform" value="mobile" checked={platform === 'mobile'} onChange={() => setPlatform('mobile')} className="focus:ring-brand-primary h-4 w-4 text-brand-primary border-gray-300"/>
                        <span className="ml-2">手机端</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="platform" value="pc" checked={platform === 'pc'} onChange={() => setPlatform('pc')} className="focus:ring-brand-primary h-4 w-4 text-brand-primary border-gray-300"/>
                        <span className="ml-2">电脑端</span>
                    </label>
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-dark-text-secondary">悬赏描述</label>
                <div className="relative">
                    <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                    <button
                        onClick={handleGenerateDesc}
                        disabled={isGenerating}
                        className="absolute bottom-2 right-2 flex items-center space-x-1 px-2 py-1 text-xs rounded-md bg-brand-primary hover:bg-brand-secondary disabled:bg-gray-500 transition-colors"
                    >
                        <SparklesIcon />
                        <span>{isGenerating ? '生成中...' : 'AI生成'}</span>
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="reward" className="block text-sm font-medium text-dark-text-secondary">悬赏金额 (元)</label>
                <input type="number" id="reward" value={reward} onChange={(e) => setReward(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">取消</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-md text-sm font-medium bg-brand-primary hover:bg-brand-secondary transition-colors">发布</button>
            </div>
        </div>
    );
};

const PurchaseListView: React.FC<{ title: string; products: Product[]; onPurchase: (product: Product) => void; onClose: () => void }> = ({ title, products, onPurchase, onClose }) => {
    return (
        <div>
            <h2 className="text-xl font-bold text-center text-brand-secondary mb-4">{title}</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {products.map(product => (
                    <div key={product.id} className="bg-dark-bg p-3 rounded-lg flex items-center">
                         {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0" />
                        ) : (
                            <div className="w-20 h-20 bg-dark-border rounded-md mr-4 flex-shrink-0 flex items-center justify-center">
                                <span className="text-xs text-dark-text-secondary">无图</span>
                            </div>
                        )}
                        <div className="flex-grow min-w-0">
                            <h4 className="font-semibold truncate">{product.name}</h4>
                            <p className="text-xs text-dark-text-secondary mt-1 line-clamp-2">{product.description}</p>
                            <p className="text-lg font-bold text-red-400 mt-2">¥{product.price}</p>
                        </div>
                        <button 
                            onClick={() => onPurchase(product)}
                            className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors flex-shrink-0 ml-4"
                        >
                            购买
                        </button>
                    </div>
                ))}
            </div>
             <div className="flex justify-end mt-6">
                <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-dark-border hover:bg-gray-600 transition-colors">关闭</button>
            </div>
        </div>
    );
};


const HitterCamp: React.FC<{onVipClick: () => void; onAssessmentClick: () => void;}> = ({ onVipClick, onAssessmentClick }) => {
    const [activeLeaderboard, setActiveLeaderboard] = useState('total'); // 'today', 'week', 'month', 'total'
    const [leaderboardUsers, setLeaderboardUsers] = useState<User[]>([]);

    useEffect(() => {
        // Filter for hitters and sort
        const hitters = allUsers.filter(u => u.role === 'User' && u.hitterLevel !== 'N/A' && u.hitterLevel.includes('打手'));
        
        let sortedUsers: User[] = [];
        // In a real app, you'd fetch data for each tab. Here we simulate sorting.
        switch(activeLeaderboard) {
            case 'total':
                sortedUsers = [...hitters].sort((a, b) => b.paidOut - a.paidOut);
                break;
            case 'month':
                 sortedUsers = [...hitters].sort((a, b) => b.balance - a.balance); // Just for variety
                break;
            case 'week':
                sortedUsers = [...hitters].sort((a, b) => b.deposit - a.deposit); // Just for variety
                break;
            case 'today':
            default:
                sortedUsers = [...hitters].sort(() => Math.random() - 0.5); // Shuffle for 'today'
                break;
        }

        setLeaderboardUsers(sortedUsers.slice(0, 5)); // Show top 5
    }, [activeLeaderboard]);
    
    const getRankColor = (index: number) => {
        if (index === 0) return 'text-yellow-400';
        if (index === 1) return 'text-gray-300';
        if (index === 2) return 'text-yellow-600';
        return 'text-dark-text-secondary';
    };

    const LeaderboardButton: React.FC<{ type: string, label: string }> = ({ type, label }) => (
        <button 
            onClick={() => setActiveLeaderboard(type)}
            className={`text-sm hover:text-white transition-colors ${activeLeaderboard === type ? 'text-brand-secondary font-semibold' : 'text-dark-text-secondary'}`}
        >
            {label}
        </button>
    );

    return (
        <Card>
            <h2 className="text-xl font-bold text-brand-secondary mb-4">打手营</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <button onClick={onVipClick} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-colors">VIP打手认证</button>
                <button onClick={onAssessmentClick} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition-colors">申请考核</button>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">打手榜</h3>
                <div className="flex justify-around bg-dark-bg p-2 rounded-lg">
                    <LeaderboardButton type="today" label="今日最牛" />
                    <LeaderboardButton type="week" label="周冠军" />
                    <LeaderboardButton type="month" label="月冠军" />
                    <LeaderboardButton type="total" label="总排行" />
                </div>
                 <div className="mt-4 space-y-3">
                    {leaderboardUsers.map((user, index) => (
                        <div key={user.id} className="flex items-center space-x-4 p-2 bg-dark-bg rounded-lg">
                            <span className={`text-xl font-bold w-8 text-center ${getRankColor(index)}`}>{index + 1}</span>
                            <img src={`https://picsum.photos/seed/${user.id}/40/40`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-grow min-w-0">
                                <p className="font-semibold truncate">{user.name}</p>
                                <p className="text-xs text-dark-text-secondary">{user.hitterIdentity} - {user.hitterLevel}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-bold text-green-400">¥{user.paidOut.toLocaleString()}</p>
                                <p className="text-xs text-dark-text-secondary">总收入</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}


interface BarPageProps {
  orders: Order[];
  currentUser: User;
  onUpdateOrder: (order: Order) => void;
}

const BarPage: React.FC<BarPageProps> = ({ orders, currentUser, onUpdateOrder }) => {
  const [bounties, setBounties] = useState<Bounty[]>(allBounties);
  const [modalContent, setModalContent] = useState<'bounty' | 'vip' | 'assessment' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Order Hall State
  const [orderFilter, setOrderFilter] = useState<'all' | 'mobile' | 'pc'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedOrders = useMemo(() => {
    return orders
      .filter(o => o.status === OrderStatus.PendingAccept)
      .filter(o => {
        if (orderFilter === 'all') return true;
        return o.platform === orderFilter;
      })
      .filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [orders, orderFilter, searchQuery]);

  const closeModal = useCallback(() => setModalContent(null), []);

  const handleAddBounty = (bountyData: { title: string; description: string; reward: number; platform: 'mobile' | 'pc' }) => {
    const newBounty: Bounty = {
        id: `bounty_${new Date().getTime()}`,
        status: BountyStatus.InProgress,
        participants: 0,
        maxParticipants: 5, // Default value
        ...bountyData
    };
    setBounties(prevBounties => [newBounty, ...prevBounties]);
    closeModal();
  };

  const handleBountySignUp = (bountyId: string) => {
    setBounties(prevBounties => {
      return prevBounties.map(bounty => {
        if (bounty.id === bountyId) {
          if (bounty.participants >= bounty.maxParticipants) {
            alert('报名人数已满！');
            return bounty; // Return unchanged
          }
          if (bounty.status !== BountyStatus.InProgress) {
            alert('该悬赏已结束或未开始。');
            return bounty;
          }
          alert('报名成功！');
          return { ...bounty, participants: bounty.participants + 1 };
        }
        return bounty;
      });
    });
  };

  const handleVipPurchase = useCallback((product: Product) => {
    if (mockUserForPurchase && mockUserForPurchase.deposit >= 100) {
        alert(`购买成功！系统将根据订单最终评价自动为您认证身份: ${product.grantsIdentity}`);
    } else {
        alert(`认证失败！您的保证金不足100元，当前为${mockUserForPurchase?.deposit}元。请先充值保证金。`);
    }
    closeModal();
  }, [closeModal]);

  const handleAssessmentPurchase = useCallback((product: Product) => {
    alert(`已成功购买考核: ${product.name}。系统将根据订单最终评价自动为您认证身份: ${product.grantsIdentity}`);
    closeModal();
  }, [closeModal]);

  const handleAcceptOrder = (orderToAccept: Order) => {
    const updatedOrder = {
      ...orderToAccept,
      status: OrderStatus.InProgress,
      hitterId: currentUser.id,
      acceptTime: new Date().toLocaleString('sv-SE'), // Set accept time
    };
    onUpdateOrder(updatedOrder);
    setSelectedOrder(null);
    alert(`接单成功！订单号: ${orderToAccept.id}`);
  };

  const renderModalContent = () => {
    switch(modalContent) {
        case 'bounty':
            return <BountyForm onClose={closeModal} onAddBounty={handleAddBounty} />;
        case 'vip':
            return <PurchaseListView title="VIP打手认证" products={vipProducts} onPurchase={handleVipPurchase} onClose={closeModal} />;
        case 'assessment':
            return <PurchaseListView title="申请考核" products={assessmentProducts} onPurchase={handleAssessmentPurchase} onClose={closeModal} />;
        default:
            return null;
    }
  };

  const productMap = useMemo(() => {
    return allProducts.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {} as Record<string, Product>);
  }, []);

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const product = productMap[order.productId];

    return (
      <Card>
        <div className="flex justify-between items-center text-sm mb-3">
            <span className="font-semibold">{order.platform === 'mobile' ? '手机端' : '电脑端'}</span>
            <span className="text-dark-text-secondary">预计服务费: <span className="text-yellow-400 font-bold">¥{(order.amount * (1 - (product?.serviceFee || 0)/100)).toFixed(2)}</span></span>
        </div>

        <div className="border-t border-dark-border pt-4">
            <h4 className="font-bold mb-2">商品信息</h4>
            <div className="flex items-start space-x-4">
                {product?.images?.[0] && (
                    <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                )}
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <h5 className="font-semibold text-brand-secondary">{order.productName}</h5>
                        <div className="text-right flex-shrink-0 pl-2">
                           <p className="text-lg font-bold text-red-400">¥{order.amount.toFixed(2)}</p>
                           <p className="text-xs text-dark-text-secondary">x1</p>
                        </div>
                    </div>
                    <p className="text-xs text-dark-text-secondary mt-1 line-clamp-2">{product?.description}</p>
                </div>
            </div>
        </div>

        <div className="border-t border-dark-border pt-3 mt-4 text-sm space-y-2">
            <div className="flex justify-between"><span className="text-dark-text-secondary">订单编号</span><span>{order.id}</span></div>
            <div className="flex justify-between"><span className="text-dark-text-secondary">商品分类</span><span>{order.category}</span></div>
            <div className="flex justify-between"><span className="text-dark-text-secondary">游戏ID</span><span>{order.gameId}</span></div>
            <div className="flex justify-between"><span className="text-dark-text-secondary">游戏区服</span><span>{order.server}</span></div>
            <div className="flex justify-between"><span className="text-dark-text-secondary">订单备注</span><span>{order.notes}</span></div>
        </div>

        <div className="border-t border-dark-border pt-3 mt-4 flex justify-between items-center">
            <p className="font-bold">实付款 <span className="text-red-400 text-xl">¥{order.amount.toFixed(2)}</span></p>
            <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-dark-bg border border-dark-border hover:bg-dark-border transition-colors">
                查看
            </button>
        </div>
      </Card>
    );
  };

  const OrderHallFilter: React.FC = () => {
    const tabs = [
        { id: 'all', label: '全部区' },
        { id: 'mobile', label: '手机端' },
        { id: 'pc', label: '电脑端' },
    ];
    return (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="商品编号"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
            </div>
            <div className="flex justify-around items-center">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setOrderFilter(tab.id as 'all' | 'mobile' | 'pc')}
                        className={`relative py-2 px-4 text-sm font-semibold transition-colors ${
                            orderFilter === tab.id
                                ? 'text-brand-secondary'
                                : 'text-dark-text-secondary hover:text-dark-text-primary'
                        }`}
                    >
                        {tab.label}
                        {orderFilter === tab.id && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-brand-primary rounded-full"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 space-y-6">
        <HitterCamp 
            onVipClick={() => setModalContent('vip')}
            onAssessmentClick={() => setModalContent('assessment')}
        />
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-brand-secondary">悬赏大厅</h2>
            <button onClick={() => setModalContent('bounty')} className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-secondary transition-colors font-semibold">发布悬赏</button>
        </div>
      
        <div className="space-y-4">
            {bounties.map(bounty => {
                const isFull = bounty.participants >= bounty.maxParticipants;
                return (
                    <Card key={bounty.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{bounty.title}</h3>
                                <p className="text-sm text-dark-text-secondary mt-1">{bounty.description}</p>
                            </div>
                             <div className="text-right flex-shrink-0 ml-4">
                                <span className={`text-2xl font-bold ${bounty.status === BountyStatus.InProgress ? 'text-yellow-400' : 'text-green-400'}`}>
                                    ¥{bounty.reward}
                                </span>
                                 {bounty.platform && <span className={`mt-1 text-xs px-2 py-0.5 rounded-full ${bounty.platform === 'mobile' ? 'bg-blue-600 text-blue-100' : 'bg-green-600 text-green-100'}`}>{bounty.platform === 'mobile' ? '手机' : '电脑'}</span>}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-2 border-t border-dark-border">
                            <div className="text-sm text-dark-text-secondary">
                                <span className={bounty.status === BountyStatus.InProgress ? 'text-blue-400' : 'text-gray-500'}>{bounty.status}</span> | 报名: {bounty.participants}/{bounty.maxParticipants}
                            </div>
                            {bounty.status === BountyStatus.InProgress && (
                                <button
                                    onClick={() => handleBountySignUp(bounty.id)}
                                    disabled={isFull}
                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                        isFull 
                                        ? 'bg-gray-500 cursor-not-allowed' 
                                        : 'bg-green-600 hover:bg-green-500'
                                    }`}
                                >
                                    {isFull ? '已满' : '报名'}
                                </button>
                            )}
                        </div>
                    </Card>
                );
            })}
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-secondary pt-4 border-t border-dark-border">接单大厅</h2>
            <OrderHallFilter />
            <div className="space-y-4">
                {displayedOrders.length > 0 ? (
                    displayedOrders.map(order => <OrderCard key={order.id} order={order} />)
                ) : (
                    <Card className="text-center py-10">
                        <p className="text-dark-text-secondary">没有找到符合条件的订单。</p>
                    </Card>
                )}
            </div>
        </div>

        <Modal isOpen={modalContent !== null} onClose={closeModal}>
            {renderModalContent()}
        </Modal>

        {selectedOrder && (
            <OrderDetailModal
                order={selectedOrder}
                product={productMap[selectedOrder.productId]}
                onClose={() => setSelectedOrder(null)}
                onAccept={handleAcceptOrder}
            />
        )}
    </div>
  );
};

export default BarPage;
