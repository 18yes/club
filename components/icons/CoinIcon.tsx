
import React from 'react';

const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path d="M13 7h-2v2h2v2h-2v2h2v2h-4V9a2 2 0 012-2h2zm-1 8c-1.1 0-2-.9-2-2s.9-2 2-2" />
  </svg>
);

export default CoinIcon;
