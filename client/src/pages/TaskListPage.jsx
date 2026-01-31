import React from "react";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
const TaskListPage = () => {
  return (
    <div className="pt-2">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Tasks</h1>
          <p className="text-slate-400 text-sm mt-2">Keep up the good work.</p>
        </div>
        <div className="text-xs font-semibold text-slate-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
          1 Pending
        </div>
      </header>

      <div className="space-y-4">
        {/* Task Card */}
        <div className="group bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white">
              Clone the repository
            </h3>
            <Badge props={{ color: "blue", text: "Pending" }} />
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
            If you can't wait for a new release to test the latest features, you
            will need to clone the repository to your local machine.
          </p>

          <div className="flex gap-2 items-center pt-4 border-t border-white/5">
            <Link 
              className="flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200" 
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </Link>
            <button 
              className="flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200" 
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
            <Link 
              to="/show-task/1"
              className="ml-auto flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Details <span className="text-lg">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;