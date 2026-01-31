import React, { useState } from "react";
import { z, ZodError } from 'zod'
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";

const HomePage = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })
    const [err, setError] = useState({})

    // Define individual field schemas for reliable validation
    const titleSchema = z.string().min(3, { message: "Title must be at least 3 characters long." });
    const descriptionSchema = z.string().min(3, { message: "Description must be at least 3 characters long." }).max(500, { message: 'Length exceeded.' });
    
    const taskSchema = z.object({
        title: titleSchema,
        description: descriptionSchema
    })

    const handleInput = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        // Clear error when user types
        if (err[name]) {
            setError((prev) => ({ ...prev, [name]: "" }));
        }
    }

    const validateField = (name, value) => {
        try {
            if (name === 'title') {
                titleSchema.parse(value);
            } else if (name === 'description') {
                descriptionSchema.parse(value);
            }
            // If valid, clear any existing error for this field
            setError((prev) => ({ ...prev, [name]: "" }));
        } catch (error) {
            if (error instanceof ZodError || error.name === 'ZodError') {
                // For individual field schemas, the error message is directly on the first error
                const message = error.errors?.[0]?.message || error.message;
                setError((prev) => ({ ...prev, [name]: message }));
            }
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate all fields first
        let hasErrors = false;
        const newErrors = {};
        
        // Validate title
        try {
            titleSchema.parse(formData.title);
        } catch (error) {
            hasErrors = true;
            newErrors.title = error.errors?.[0]?.message || "Invalid title";
        }
        
        // Validate description
        try {
            descriptionSchema.parse(formData.description);
        } catch (error) {
            hasErrors = true;
            newErrors.description = error.errors?.[0]?.message || "Invalid description";
        }
        
        if (hasErrors) {
            setError(newErrors);
            return; // Don't submit if there are validation errors
        }
        
        // Clear errors and proceed with submission
        setError({});
        
        try {
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/task/create-task`;
            console.log("API URL:", apiUrl);
            console.log("Form Data:", formData);
            
            const response = await fetch(apiUrl,
                {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(formData)
                })

            console.log("Response status:", response.status);
            const responseData = await response.json()
            console.log("Response data:", responseData);
            
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setFormData({ title: "", description: "" })
            showToast('success', responseData.message)
        } catch (error) {
            console.error("Error:", error);
            showToast('error', error.message)
        }
    }


  return (
    <div className="pt-2">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-white">Let's get things done.</h1>
        <p className="text-slate-400 text-sm mt-2">What do you want to achieve today?</p>
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
          
        </div>

        <button
          type="submit"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-900 font-semibold rounded-2xl text-sm px-6 py-4 text-center shadow-lg shadow-indigo-900/20 transform transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          Add to List
        </button>
      </form>
    </div>
  );
};

export default HomePage;