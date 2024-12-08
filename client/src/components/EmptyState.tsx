import { useNavigate } from 'react-router-dom';
import { FiGift, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const EmptyState = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
        >
            <div className="animate-float">
                <FiGift className="mx-auto h-16 w-16 text-cyan-500/50" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
                No rewards available
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {isAuthenticated 
                    ? "Be the first to create a reward!"
                    : "Sign in to create your first reward!"}
            </p>
            <div className="mt-6">
                <button
                    onClick={() => isAuthenticated ? navigate('/rewards/create') : navigate('/signin')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500
                        text-white font-medium hover:from-cyan-600 hover:to-blue-600
                        transition-all duration-200"
                >
                    {isAuthenticated ? 'Create Reward' : 'Sign In'}
                </button>
            </div>
        </motion.div>
    );
}; 