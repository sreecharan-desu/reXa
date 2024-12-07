import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface RedeemDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    points: number;
    isLoading?: boolean;
}

export const RedeemDialog = ({ isOpen, onClose, onConfirm, points, isLoading }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleConfirm = async () => {
        try {
            await onConfirm();
            setIsSuccess(true);
            // Auto close after showing success animation
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 2000);
        } catch (error) {
            // Error handling is already in RewardCard
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Dialog */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative bg-white dark:bg-slate-800 rounded-xl 
                            shadow-xl max-w-md w-full mx-4 p-6
                            transform transition-all duration-300 ease-out"
                    >
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                // Success State
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", duration: 0.5 }}
                                    >
                                        <svg 
                                            className="mx-auto h-16 w-16 text-green-500 mb-4" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M5 13l4 4L19 7" 
                                            />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                        Reward Redeemed!
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Your reward has been successfully redeemed
                                    </p>
                                </motion.div>
                            ) : (
                                // Confirmation State
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center"
                                >
                                    <svg 
                                        className="mx-auto h-12 w-12 text-cyan-500 mb-4" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                        />
                                    </svg>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                        Confirm Redemption
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                        This will cost you {points} points
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={onClose}
                                            disabled={isLoading}
                                            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300
                                                bg-slate-100 dark:bg-slate-700 rounded-lg
                                                hover:bg-slate-200 dark:hover:bg-slate-600
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                                                disabled:opacity-50 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirm}
                                            disabled={isLoading}
                                            className="px-4 py-2 text-sm font-medium text-white
                                                bg-cyan-500 rounded-lg
                                                hover:bg-cyan-600
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                                                disabled:opacity-50 transition-colors duration-200
                                                flex items-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Redeeming...
                                                </>
                                            ) : (
                                                'Confirm'
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}; 