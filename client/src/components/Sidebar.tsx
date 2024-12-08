import { FiHome, FiGift, FiUser, FiBook, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-14 sm:w-16 lg:w-20 flex flex-col items-center py-6 sm:py-8 
            bg-white/90 dark:bg-gray-800/90 border-r border-gray-200 dark:border-gray-700
            backdrop-blur-sm z-50">
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

            {/* Logout Button - Added at the bottom with margin-top:auto to push it to the bottom */}
            {isAuthenticated && (
                <button
                    onClick={logout}
                    className="p-2 sm:p-3 lg:p-4 rounded-xl mt-auto text-gray-500 hover:text-red-500 
                        dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                    title="Logout">
                    <FiLogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            )}
        </aside>
    );
}; 