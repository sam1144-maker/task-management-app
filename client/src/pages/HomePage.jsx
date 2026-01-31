import React from "react";

const HomePage = () => {
  return (
    <div className="pt-2">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-white">Let's get things done.</h1>
        <p className="text-slate-400 text-sm mt-2">What do you want to achieve today?</p>
      </header>

      <form className="space-y-6">
        <div className="group">
          <label className="block mb-2 text-sm font-medium text-slate-300 group-focus-within:text-white transition-colors">
            Title
          </label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white/10 block p-3.5 placeholder-slate-500 transition-all duration-300"
            placeholder="e.g., Finish the quarterly report"
            required
          />
        </div>
        <div className="group">
          <label className="block mb-2 text-sm font-medium text-slate-300 group-focus-within:text-white transition-colors">
            Description
          </label>
          <textarea
            rows="4"
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white/10 block p-3.5 placeholder-slate-500 transition-all duration-300"
            placeholder="Add any extra details..."
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