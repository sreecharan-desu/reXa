import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { AppRoutes } from './routes/index';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => (
  <BrowserRouter>
    <DarkModeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 
                      dark:from-secondary-900 dark:to-primary-900">
          <Navbar />
          <Sidebar />
          <Toaster position="top-right" />
          <main className="ml-12 py-6">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </DarkModeProvider>
  </BrowserRouter>
);

export default App;
