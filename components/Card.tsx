
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-4' }) => {
  return (
    <div className={`bg-dark-card rounded-lg shadow-md ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
