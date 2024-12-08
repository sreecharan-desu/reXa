import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import { Navbar } from './components/Navbar';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Toaster position="top-right" />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <AppRoutes />
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
