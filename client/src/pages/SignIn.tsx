import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            await login(email, password);
            
            // Get and validate redirect URL
            const params = new URLSearchParams(location.search);
            const redirectTo = params.get('redirect');
            
            // Validate redirect path to prevent loops
            if (redirectTo && 
                redirectTo !== '/signin' && 
                redirectTo !== '/register' && 
                !redirectTo.includes('redirect=')) {
                navigate(redirectTo);
            } else {
                navigate('/');
            }
            
            toast.success('Welcome back!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to sign in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 
                                    border border-gray-300 dark:border-slate-600 
                                    placeholder-gray-500 dark:placeholder-slate-400
                                    text-gray-900 dark:text-white
                                    bg-white dark:bg-slate-700
                                    focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 
                                    focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 
                                    border border-gray-300 dark:border-slate-600 
                                    placeholder-gray-500 dark:placeholder-slate-400
                                    text-gray-900 dark:text-white
                                    bg-white dark:bg-slate-700
                                    focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 
                                    focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-2 px-4 
                            border border-transparent text-sm font-medium rounded-lg
                            text-white bg-cyan-600 hover:bg-cyan-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className="font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
                        >
                            Register here
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}; 