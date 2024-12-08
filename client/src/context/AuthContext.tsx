import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, authApi } from '../services/api';
import { toast } from 'react-hot-toast';

interface User {
    _id: string;
    name: string;
    email: string;
    points: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Initialize user state from localStorage if available
        const token = localStorage.getItem('token');
        return token ? null : null; // Will be populated by fetchProfile if token exists
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Initialize auth state from localStorage
        return !!localStorage.getItem('token');
    });
    const [isLoading, setIsLoading] = useState(true);

    // Function to set auth token in axios headers
    const setAuthToken = (token: string | null) => {
        if (token) {
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        }
    };

    const login = async (email: string, password: string) => {
        const response = await authApi.signin({ email, password });
        const { token } = response.data;
        setAuthToken(token);
        await fetchProfile();
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            setAuthToken(token);
            const response = await authApi.getProfile();
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (localStorage.getItem('token')) {
                console.error('Failed to load profile:', error);
            }
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    // Check for token and fetch profile on mount
    useEffect(() => {
        fetchProfile();
    }, []);

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};