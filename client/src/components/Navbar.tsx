import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';
import { FiUser } from 'react-icons/fi';
import { Logo } from './Logo';
import { ProfileIcon } from './ProfileIcon';

export const Navbar = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 
            border-b border-slate-200/80 dark:border-slate-800/80
            shadow-sm shadow-slate-200/20 dark:shadow-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[4.5rem]">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <Logo />
                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 
                            bg-clip-text text-transparent">
                            reX
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <ProfileIcon name={user?.name || ''} />
                                </div>
                                <UserMenu />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/signin"
                                    className="text-slate-600 hover:text-slate-900 dark:text-slate-300 
                                        dark:hover:text-white transition-colors duration-200 
                                        font-medium px-3 py-2 rounded-lg hover:bg-slate-100/50 
                                        dark:hover:bg-slate-800/50"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 
                                        hover:from-cyan-600 hover:to-blue-600 text-white 
                                        px-5 py-2 rounded-lg font-medium transition-all 
                                        duration-200 hover:shadow-lg hover:shadow-cyan-500/20
                                        active:scale-[0.98]"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
