import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { UserMenu } from './UserMenu';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
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
                             rounded-lg transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 shadow-md px-4 py-3 space-y-3">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/signin"
                className="block text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block text-white text-center py-2 rounded-lg bg-gradient-to-r 
                           from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
