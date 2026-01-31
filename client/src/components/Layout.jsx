import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
const Layout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Glass Card */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <Navigation />
          <main className="animate-fade-in-up">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;