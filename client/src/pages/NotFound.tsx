import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                >
                    <FiHome className="w-5 h-5" />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}; 