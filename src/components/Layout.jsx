import React from 'react';
import WhatsAppButton from './WhatsAppButton';

const Layout = ({ children }) => {
  return (
    <div className="font-sans min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
      <main className="w-full h-full">
        {children}
      </main>
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
