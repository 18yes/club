import React from 'react';

const QrCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 256 256" 
        className={className} 
        fill="currentColor"
    >
        <rect width="256" height="256" fill="none"></rect>
        <path d="M120,120h16v16H120Z"></path>
        <path d="M104,120H88v16h16Z"></path>
        <path d="M120,104H88v16h32Z"></path>
        <path d="M184,120v16H168V120Z"></path>
        <path d="M120,184v-16H104v16Z"></path>
        <path d="M136,152v16h16V152Z"></path>
        <path d="M168,152H152v16h16Z"></path>
        <path d="M184,168v16h16V168Z"></path>
        <path d="M184,136H168v16h16Z"></path>
        <path d="M40,40V216H216V40ZM104,72h16V56H104Zm0,32h16V88H104ZM72,56H88V72H72ZM72,88H88v16H72Zm48,80H104v16h16Zm16-16v16H120V152Zm48,0h16v16H184Zm-16,32h16v16H168ZM152,88v16H136V88ZM88,168H72V152H88Zm80-64v16H152V88ZM136,72h16V56H136Zm32,0h16V56H168Zm16,16H168v16h16Zm16,16h16V88H200Z"></path>
    </svg>
);

export default QrCodeIcon;