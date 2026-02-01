import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="font-sans min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
      <main className="w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
