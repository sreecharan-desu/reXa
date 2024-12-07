import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-slate-800 dark:text-white mb-4">
                    404
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                    Oops! Page not found
                </p>
                <Link 
                    to="/"
                    className="inline-flex items-center px-6 py-3 
                        bg-gradient-to-r from-cyan-500 to-blue-500
                        text-white rounded-lg text-sm font-medium
                        hover:from-blue-500 hover:to-cyan-500
                        transform hover:scale-105
                        transition-all duration-300 ease-out
                        shadow-md hover:shadow-lg"
                >
                    <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                        />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}; 