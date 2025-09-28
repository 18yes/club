
import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import BarPage from './components/BarPage';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import BottomNav from './components/BottomNav';
import { UserRole, Page } from './types';
import AdminIcon from './components/icons/AdminIcon';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Boss);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  const handleNavChange = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const toggleUserRole = () => {
    setCurrentUserRole(prevRole => prevRole === UserRole.Boss ? UserRole.Hitter : UserRole.Boss);
  };

  const toggleAdminView = () => {
    setIsAdminView(prev => !prev);
    if (!isAdminView) {
      setCurrentPage(Page.Home); // Reset to a default page when entering admin view
    }
  };

  const renderPage = () => {
    if (isAdminView) {
      return <AdminPage />;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage currentUserRole={currentUserRole} />;
      case Page.Category:
        return <CategoryPage />;
      case Page.Bar:
        return <BarPage />;
      case Page.Profile:
        return <ProfilePage />;
      default:
        return <HomePage currentUserRole={currentUserRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary font-sans">
      <header className="bg-dark-card p-4 shadow-md flex justify-between items-center sticky top-0 z-50 border-b border-dark-border">
        <h1 className="text-xl font-bold text-brand-secondary">俱乐部平台</h1>
        <div className="flex items-center space-x-4">
          {!isAdminView && (
            <button
              onClick={toggleUserRole}
              className="px-3 py-1 text-sm rounded-full bg-brand-primary hover:bg-brand-secondary transition-colors"
            >
              切换为: {currentUserRole === UserRole.Boss ? '打手' : '老板'}
            </button>
          )}
          <button
            onClick={toggleAdminView}
            title={isAdminView ? "退出管理" : "进入管理"}
            className="p-2 rounded-full hover:bg-dark-border transition-colors"
          >
            <AdminIcon />
          </button>
        </div>
      </header>

      <main className={`pb-20 transition-all duration-300 ${isAdminView ? 'pt-0' : 'pt-4'}`}>
        {renderPage()}
      </main>

      {!isAdminView && (
        <BottomNav activePage={currentPage} onNavChange={handleNavChange} />
      )}
    </div>
  );
};

export default App;
