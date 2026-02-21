import React from 'react';
import WhatsAppButton from './WhatsAppButton';

const Layout = ({ children }) => {
  return (
    <div className="font-sans min-h-screen bg-white text-slate-800 selection:bg-red-50">
      <main className="w-full h-full">
        {children}
      </main>
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
