import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Badge from '../components/Badge'
import { showToast } from '../helper/showToast'

const ShowTask = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`);
        const data = await response.json();
        if (data.status) {
          setTask(data.taskData);
        } else {
          showToast('error', 'Task not found');
          navigate('/task-list');
        }
      } catch (error) {
        showToast('error', 'Failed to fetch task');
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskid, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskid}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.status) {
        showToast('success', data.message);
        navigate('/task-list');
      } else {
        showToast('error', data.message);
      }
    } catch (error) {
      showToast('error', 'Failed to delete task');
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ ...task, status: newStatus })
      });
      const data = await response.json();
      if (data.status) {
        setTask(data.taskData);
        showToast('success', 'Status updated!');
      }
    } catch (error) {
      showToast('error', 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'yellow';
      default: return 'blue';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="pt-2">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="pt-2 text-center">
        <p className="text-slate-400">Task not found</p>
        <Link to="/task-list" className="text-indigo-400 hover:text-indigo-300 mt-4 inline-block">
          ← Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <header className="mb-6">
        <Link to="/task-list" className="text-slate-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
          <span>←</span> Back to Tasks
        </Link>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mt-2">
          Task Details
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
      </header>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(79,70,229,0.1)]">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">{task.title}</h2>
          <Badge props={{ color: getStatusColor(task.status), text: getStatusText(task.status) }} />
        </div>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Description</h3>
          <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
            {task.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Change Status</h3>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => handleStatusChange('pending')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${task.status === 'pending' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => handleStatusChange('in-progress')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${task.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'}`}
            >
              In Progress
            </button>
            <button 
              onClick={() => handleStatusChange('completed')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${task.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'}`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-white/10">
          <Link 
            to={`/edit-task/${task._id}`}
            className="flex-1 text-center py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all"
          >
            Edit Task
          </Link>
          <button 
            onClick={handleDelete}
            className="py-3 px-6 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-all border border-red-500/20"
          >
            Delete
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-xs text-slate-500">
          <p>Created: {new Date(task.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
          {task.updatedAt && (
            <p>Last updated: {new Date(task.updatedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShowTask