import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { useAuth } from '../context/AuthContext';
import { FiBook } from 'react-icons/fi';
import { Logo } from './Logo';

export const Navbar = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    {/* Navigation Links */}
                    <div className="hidden sm:flex items-center space-x-4">
                        <Link 
                            to="/documentation"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 
                                     dark:text-gray-200 dark:hover:text-cyan-400 transition-colors"
                        >
                            <FiBook className="w-4 h-4" />
                            <span>Docs</span>
                        </Link>
                        
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                {/* <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {user?.points} points
                                </div> */}
                                <UserMenu />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/signin"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 
                                             dark:text-gray-200 dark:hover:text-cyan-400 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r 
                                             from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 
                                             rounded-lg transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="sm:hidden">
                        <UserMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
};
