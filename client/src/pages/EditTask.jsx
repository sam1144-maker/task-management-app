import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { z, ZodError } from 'zod';
import { showToast } from "../helper/showToast";

const EditTask = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending"
  });
  const [err, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const titleSchema = z.string().min(3, { message: "Title must be at least 3 characters long." });
  const descriptionSchema = z.string().min(3, { message: "Description must be at least 3 characters long." }).max(500, { message: 'Length exceeded.' });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`);
        const data = await response.json();
        if (data.status) {
          setFormData({
            title: data.taskData.title,
            description: data.taskData.description,
            status: data.taskData.status || 'pending'
          });
        } else {
          showToast('error', 'Task not found');
          navigate('/task-list');
        }
      } catch (error) {
        showToast('error', 'Failed to fetch task');
        navigate('/task-list');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskid, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (err[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name, value) => {
    try {
      if (name === 'title') {
        titleSchema.parse(value);
      } else if (name === 'description') {
        descriptionSchema.parse(value);
      }
      setError((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof ZodError || error.name === 'ZodError') {
        const message = error.errors?.[0]?.message || error.message;
        setError((prev) => ({ ...prev, [name]: message }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newErrors = {};
    
    try {
      titleSchema.parse(formData.title);
    } catch (error) {
      hasErrors = true;
      newErrors.title = error.errors?.[0]?.message || "Invalid title";
    }
    
    try {
      descriptionSchema.parse(formData.description);
    } catch (error) {
      hasErrors = true;
      newErrors.description = error.errors?.[0]?.message || "Invalid description";
    }
    
    if (hasErrors) {
      setError(newErrors);
      return;
    }
    
    setError({});
    setSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`, {
        method: "PUT",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      showToast('success', responseData.message);
      navigate('/task-list');
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setSubmitting(false);
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

  return (
    <div className="pt-2">
      <header className="mb-8">
        <Link to="/task-list" className="text-slate-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
          <span>←</span> Back to Tasks
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Edit Task</h1>
        <p className="text-slate-400 text-sm mt-2">Update your task details below.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block mb-2 text-sm font-medium text-slate-300 group-focus-within:text-white transition-colors">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white/10 block p-3.5 placeholder-slate-500 transition-all duration-300"
            placeholder="e.g., Finish the quarterly report"
            onChange={handleInput}
            onBlur={handleBlur}
          />
          {err.title && <p className="mt-2 text-sm text-red-400">{err.title}</p>}
        </div>
        
        <div className="group">
          <label className="block mb-2 text-sm font-medium text-slate-300 group-focus-within:text-white transition-colors">
            Description
          </label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white/10 block p-3.5 placeholder-slate-500 transition-all duration-300"
            placeholder="Add any extra details..."
            onChange={handleInput}
            onBlur={handleBlur}
          ></textarea>
          {err.description && <p className="mt-2 text-sm text-red-400">{err.description}</p>}
        </div>

        <div className="group">
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInput}
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white/10 block p-3.5 transition-all duration-300"
          >
            <option value="pending" className="bg-slate-800">Pending</option>
            <option value="in-progress" className="bg-slate-800">In Progress</option>
            <option value="completed" className="bg-slate-800">Completed</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-900 font-semibold rounded-2xl text-sm px-6 py-4 text-center shadow-lg shadow-indigo-900/20 transform transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Updating...' : 'Update Task'}
          </button>
          <Link
            to="/task-list"
            className="px-6 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-medium transition-all border border-white/10"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
