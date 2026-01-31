import React, { useState, useEffect } from "react";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import { showToast } from "../helper/showToast";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`);
      const data = await response.json();
      if (data.status) {
        setTasks(data.taskData);
      }
    } catch (error) {
      showToast('error', 'Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.status) {
        showToast('success', data.message);
        // Refresh the task list
        fetchTasks();
      } else {
        showToast('error', data.message);
      }
    } catch (error) {
      showToast('error', 'Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'yellow';
      default:
        return 'blue';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Pending';
    }
  };

  const pendingCount = tasks.filter(task => task.status !== 'completed').length;

  if (loading) {
    return (
      <div className="pt-2">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Tasks</h1>
          <p className="text-slate-400 text-sm mt-2">Keep up the good work.</p>
        </div>
        <div className="text-xs font-semibold text-slate-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
          {pendingCount} Pending
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No tasks yet. Create your first task!</p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-medium transition-all"
          >
            + Add New Task
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className="group bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {task.title}
                </h3>
                <Badge props={{ color: getStatusColor(task.status), text: getStatusText(task.status) }} />
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                {task.description}
              </p>

              <div className="flex gap-2 items-center pt-4 border-t border-white/5">
                <Link 
                  to={`/edit-task/${task._id}`}
                  className="flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200" 
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </Link>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="flex items-center justify-center p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all duration-200" 
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
                <Link 
                  to={`/show-task/${task._id}`}
                  className="ml-auto flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  Details <span className="text-lg">›</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListPage;