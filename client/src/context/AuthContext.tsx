import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
    updatePoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authApi.getProfile()
                .then(response => {
                    setUser(response.data);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                });
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.signin({ email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
        return response;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updatePoints = (points: number) => {
        setUser(prev => ({ ...prev, points }));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updatePoints }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};