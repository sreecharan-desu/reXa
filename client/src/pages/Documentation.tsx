import React from "react";

const RexDocs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-blue-600">reX Platform</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        A secure reward exchange platform for seamless digital trading.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <h2 className="text-lg font-semibold text-blue-700">Create Rewards</h2>
          </div>
          <p className="text-gray-600">Define custom digital rewards with configurable point values and attributes.</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 3h5v5" />
              <path d="M21 3l-7 7" />
              <path d="M8 21H3v-5" />
              <path d="M3 21l7-7" />
            </svg>
            <h2 className="text-lg font-semibold text-blue-700">Exchange Rewards</h2>
          </div>
          <p className="text-gray-600">Securely trade and transfer reward points between users and systems.</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20v-6" />
              <path d="M8 20v-2" />
              <path d="M16 20v-4" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <h2 className="text-lg font-semibold text-blue-700">Track Transactions</h2>
          </div>
          <p className="text-gray-600">Monitor and analyze all reward exchanges with detailed transaction history.</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
          <h2 className="text-lg font-semibold text-blue-700">GitHub Repository</h2>
        </div>
        <a 
          href="https://github.com/sreecharan-desu/reX" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-between bg-white p-3 rounded border border-gray-200 hover:bg-gray-100 transition-colors group"
        >
          <span className="text-blue-600">github.com/sreecharan-desu/reX</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default RexDocs;
