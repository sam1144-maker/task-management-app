import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RouteIndex, RouteTaskList } from "../helper/RouteName";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex space-x-4 border-b border-white/5 pb-6 mb-8">
      <NavLink
        to={RouteIndex}
        className={({ isActive }) =>
          `flex-1 group flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-2xl transition-all duration-300 ${
            isActive
              ? "text-white bg-white/10 shadow-sm ring-1 ring-white/10"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span>New Task</span>
      </NavLink>
      
      <NavLink
        to={RouteTaskList}
        className={({ isActive }) =>
          `flex-1 group flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-2xl transition-all duration-300 ${
            isActive
              ? "text-white bg-white/10 shadow-sm ring-1 ring-white/10"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        <span>My List</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;