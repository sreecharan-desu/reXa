import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DarkModeToggle } from './DarkModeToggle';

export const Sidebar = () => {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="fixed left-0 top-0 h-full w-12 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between py-4">
            <div /> {/* Spacer */}
            <div className="flex flex-col items-center space-y-3">
                <DarkModeToggle />
                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="p-1.5 text-gray-700 dark:text-gray-200 hover:text-cyan-500 
                                 dark:hover:text-cyan-400 transition-colors"
                        title="Logout"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}; 