
import React from 'react';
import { Page } from '../types';
import HomeIcon from './icons/HomeIcon';
import CategoryIcon from './icons/CategoryIcon';
import BarIcon from './icons/BarIcon';
import UserIcon from './icons/UserIcon';

interface BottomNavProps {
  activePage: Page;
  onNavChange: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (page: Page) => void;
}> = ({ page, label, icon, isActive, onClick }) => {
  const colorClass = isActive ? 'text-brand-primary' : 'text-dark-text-secondary';
  return (
    <button
      onClick={() => onClick(page)}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${colorClass} hover:text-brand-secondary`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavChange }) => {
  const navItems = [
    { page: Page.Home, label: '首页', icon: <HomeIcon /> },
    { page: Page.Category, label: '分类', icon: <CategoryIcon /> },
    { page: Page.Bar, label: '酒吧', icon: <BarIcon /> },
    { page: Page.Profile, label: '我的', icon: <UserIcon /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-dark-card border-t border-dark-border z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map(item => (
          <NavItem
            key={item.page}
            page={item.page}
            label={item.label}
            icon={item.icon}
            isActive={activePage === item.page}
            onClick={onNavChange}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
