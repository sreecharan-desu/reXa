import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppRoutes } from './routes';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex">
          {isAuthenticated && <Sidebar />}
          <main
            className={`flex-1 px-4 py-8 ${
              isAuthenticated ? 'pl-20 sm:pl-24' : ''
            }`}
          >
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;


const Footer = () => {
    const year = new Date().getFullYear();
  
    return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="text-center">
              <div className="font-bold text-xl text-blue-600 dark:text-cyan-400">
                reXa
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                © {year} All rights reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  