import { FiHome, FiGift, FiUser, FiBook, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-14 sm:w-16 lg:w-20 flex flex-col items-center py-6 sm:py-8 
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
            shadow-lg z-[100]">
            <NavLink to="/" 
                className={({ isActive }) => `p-2 sm:p-3 lg:p-4 rounded-xl mb-3 sm:mb-4 transition-all duration-200
                    hover:scale-110 active:scale-95
                    ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 shadow-lg' : 
                    'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                <FiHome className="w-5 h-5 sm:w-6 sm:h-6" />
            </NavLink>
            
            {isAuthenticated && (
                <>
                    <NavLink to="/my-rewards"
                        className={({ isActive }) => `p-2 sm:p-3 lg:p-4 rounded-xl mb-3 sm:mb-4 transition-all duration-200
                            hover:scale-110 active:scale-95
                            ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 shadow-lg' : 
                            'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                        <FiGift className="w-5 h-5 sm:w-6 sm:h-6" />
                    </NavLink>
                    
                    <NavLink to="/profile"
                        className={({ isActive }) => `p-2 sm:p-3 lg:p-4 rounded-xl mb-3 sm:mb-4 transition-all duration-200
                            hover:scale-110 active:scale-95
                            ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 shadow-lg' : 
                            'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                        <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
                    </NavLink>
                </>
            )}
            
            <NavLink to="/docs"
                className={({ isActive }) => `p-2 sm:p-3 lg:p-4 rounded-xl mb-3 sm:mb-4 transition-all duration-200
                    hover:scale-110 active:scale-95
                    ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 shadow-lg' : 
                    'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                <FiBook className="w-5 h-5 sm:w-6 sm:h-6" />
            </NavLink>

            {isAuthenticated && (
                <button
                    onClick={logout}
                    className="p-2 sm:p-3 lg:p-4 rounded-xl mt-auto transition-all duration-200
                        hover:scale-110 active:scale-95 hover:rotate-12
                        text-gray-500 hover:text-red-500 
                        dark:text-gray-400 dark:hover:text-red-400
                        hover:bg-red-50 dark:hover:bg-red-500/10
                        hover:shadow-lg hover:shadow-red-500/20
                        group relative"
                    title="Logout">
                    <FiLogOut className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform group-hover:rotate-12" />
                    
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 
                        bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-md
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        pointer-events-none whitespace-nowrap
                        before:content-[''] before:absolute before:top-1/2 before:right-full
                        before:-translate-y-1/2 before:border-8 before:border-transparent
                        before:border-r-gray-800 dark:before:border-r-gray-700">
                        Logout
                    </span>
                </button>
            )}
        </aside>
    );
}; 