import { FiHome, FiGift, FiUser, FiBook, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-8 
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <NavLink to="/" 
                className={({ isActive }) => `p-3 rounded-xl mb-4 transition-colors duration-200
                    ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 
                    'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                <FiHome size={20} />
            </NavLink>
            
            {isAuthenticated && (
                <>
                    <NavLink to="/my-rewards"
                        className={({ isActive }) => `p-3 rounded-xl mb-4 transition-colors duration-200
                            ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 
                            'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                        <FiGift size={20} />
                    </NavLink>
                    
                    <NavLink to="/profile"
                        className={({ isActive }) => `p-3 rounded-xl mb-4 transition-colors duration-200
                            ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 
                            'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                        <FiUser size={20} />
                    </NavLink>
                </>
            )}
            
            <NavLink to="/docs"
                className={({ isActive }) => `p-3 rounded-xl mb-4 transition-colors duration-200
                    ${isActive ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10' : 
                    'text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400'}`}>
                <FiBook size={20} />
            </NavLink>

            {/* Logout Button - Added at the bottom with margin-top:auto to push it to the bottom */}
            {isAuthenticated && (
                <button
                    onClick={logout}
                    className="p-3 rounded-xl mt-auto text-gray-500 hover:text-red-500 
                        dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                    title="Logout">
                    <FiLogOut size={20} />
                </button>
            )}
        </aside>
    );
}; 