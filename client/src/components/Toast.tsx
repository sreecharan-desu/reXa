import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export const Toast = ({ show, onClose, message, action }: ToastProps) => {
    if (!show) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg
                border border-slate-200 dark:border-slate-700
                p-4 max-w-md flex items-center justify-between
                transform transition-all duration-300">
                <div className="flex items-center space-x-3">
                    <svg 
                        className="h-5 w-5 text-cyan-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        {message}
                    </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                    {action && (
                        <button
                            onClick={action.onClick}
                            className="text-sm font-medium text-cyan-600 dark:text-cyan-400
                                hover:text-cyan-700 dark:hover:text-cyan-300
                                transition-colors"
                        >
                            {action.label}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-500 
                            dark:text-slate-500 dark:hover:text-slate-400
                            transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}; 