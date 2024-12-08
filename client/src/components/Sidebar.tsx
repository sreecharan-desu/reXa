import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGift, FiClock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const links = [
        { path: '/', icon: FiHome, label: 'Home' },
        { path: '/my-rewards', icon: FiGift, label: 'My Rewards', protected: true },
        { path: '/transactions', icon: FiClock, label: 'Transactions', protected: true },
        { path: '/profile', icon: FiUser, label: 'Profile', protected: true },
    ];

    return (
        <aside className="hidden lg:flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            {links.map((link) => (
                (!link.protected || isAuthenticated) && (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                            ${location.pathname === link.path 
                                ? 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' 
                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                            }`}
                    >
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                    </Link>
                )
            ))}
        </aside>
    );
}; 