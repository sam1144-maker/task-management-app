import React from 'react'

const ShowTask = () => {
  return (
    <div className="pt-2">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">Task Details</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
      </header>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(79,70,229,0.1)]">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="h-32 bg-white/5 rounded w-full mt-6"></div>
        </div>
        <p className="text-center text-indigo-200/50 mt-8 text-sm">Task detail view implementation pending...</p>
      </div>
    </div>
  )
}

export default ShowTask