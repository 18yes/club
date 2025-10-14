
import React, { useState, useCallback, useMemo } from 'react';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import BarPage from './components/BarPage';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import BottomNav from './components/BottomNav';
import { UserRole, Page, Product, Order, User, OrderStatus } from './types';
import AdminIcon from './components/icons/AdminIcon';
import ProductDetailPage from './components/ProductDetailPage';
import { allOrders, allUsers } from './mockData';
import DepositRechargePage from './components/DepositRechargePage';
import BalanceRechargePage from './components/BalanceRechargePage';
import OrderListPage from './components/OrderListPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Boss);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Lifted state for dynamic updates
  const [users, setUsers] = useState<User[]>(allUsers);
  const [orders, setOrders] = useState<Order[]>(allOrders);
  
  // State for new deposit recharge page
  const [isDepositRechargeVisible, setIsDepositRechargeVisible] = useState(false);
  const [isBalanceRechargeVisible, setIsBalanceRechargeVisible] = useState(false);
  const [orderListFilter, setOrderListFilter] = useState<OrderStatus | null>(null);


  const currentUser = useMemo<User>(() => {
    if (currentUserRole === UserRole.Hitter) {
      return users.find(u => u.id === '2')!; // '大神_001'
    }
    return users.find(u => u.id === '1')!; // '玩家_8888'
  }, [currentUserRole, users]);

  const handleUpdateOrder = useCallback((updatedOrder: Order) => {
    setOrders(prevOrders =>
      prevOrders.map(o => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  }, []);
  
  const handleUpdateUser = useCallback((updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === updatedUser.id ? updatedUser : u))
    );
  }, []);

  const handleNavChange = useCallback((page: Page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
  };
  
  const handleShowOrderList = (status: OrderStatus) => {
    setOrderListFilter(status);
  };

  const handleBackFromOrderList = () => {
    setOrderListFilter(null);
  };


  const toggleUserRole = () => {
    setCurrentUserRole(prevRole => prevRole === UserRole.Boss ? UserRole.Hitter : UserRole.Boss);
  };

  const toggleAdminView = () => {
    setIsAdminView(prev => !prev);
    if (!isAdminView) {
      setCurrentPage(Page.Home);
    }
  };

  const renderPage = () => {
    if (isAdminView) {
      return <AdminPage />;
    }
    
    if (isDepositRechargeVisible) {
      return <DepositRechargePage 
        user={currentUser} 
        onUpdateUser={handleUpdateUser} 
        onBack={() => setIsDepositRechargeVisible(false)} 
      />;
    }

    if (isBalanceRechargeVisible) {
      return <BalanceRechargePage 
        user={currentUser} 
        onUpdateUser={handleUpdateUser} 
        onBack={() => setIsBalanceRechargeVisible(false)} 
      />;
    }
    
    if (orderListFilter) {
      return <OrderListPage
        user={currentUser}
        orders={orders}
        filterStatus={orderListFilter}
        onBack={handleBackFromOrderList}
      />
    }
    
    if (selectedProduct) {
        return <ProductDetailPage product={selectedProduct} onBack={handleBackFromDetail} />;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage currentUserRole={currentUserRole} onProductSelect={handleProductSelect} />;
      case Page.Category:
        return <CategoryPage onProductSelect={handleProductSelect} />;
      case Page.Bar:
        return <BarPage orders={orders} currentUser={currentUser} onUpdateOrder={handleUpdateOrder} />;
      case Page.Profile:
        return <ProfilePage user={currentUser} orders={orders} onDepositRechargeClick={() => setIsDepositRechargeVisible(true)} onBalanceRechargeClick={() => setIsBalanceRechargeVisible(true)} onUpdateUser={handleUpdateUser} onShowOrderList={handleShowOrderList} />;
      default:
        return <HomePage currentUserRole={currentUserRole} onProductSelect={handleProductSelect} />;
    }
  };

  const showHeader = !isAdminView && !selectedProduct && !isDepositRechargeVisible && !isBalanceRechargeVisible && !orderListFilter;
  const showNav = !isAdminView && !selectedProduct && !isDepositRechargeVisible && !isBalanceRechargeVisible && !orderListFilter;

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary font-sans">
      {showHeader && (
        <header className="bg-dark-card p-4 shadow-md flex justify-between items-center sticky top-0 z-50 border-b border-dark-border">
          <h1 className="text-xl font-bold text-brand-secondary">游戏俱乐部平台</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleUserRole}
              className="px-3 py-1 text-sm rounded-full bg-brand-primary hover:bg-brand-secondary transition-colors"
            >
              切换为: {currentUserRole === UserRole.Boss ? '打手' : '老板'}
            </button>
            <button
              onClick={toggleAdminView}
              title={isAdminView ? "退出管理" : "进入管理"}
              className="p-2 rounded-full hover:bg-dark-border transition-colors"
            >
              <AdminIcon />
            </button>
          </div>
        </header>
      )}

      <main className={`transition-all duration-300 ${!showNav ? '' : 'pt-4 pb-20'}`}>
        {renderPage()}
      </main>

      {showNav && (
        <BottomNav activePage={currentPage} onNavChange={handleNavChange} />
      )}
    </div>
  );
};

export default App;
