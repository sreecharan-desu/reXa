import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CONFIG } from '../config/config';

const api = axios.create({
    baseURL: CONFIG.API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle token expiration
        if (error.response?.status === 401) {
            const errorCode = error.response?.data?.code;
            
            if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'TOKEN_MISSING') {
                localStorage.removeItem('token');
                
                // Only show toast for expired tokens
                if (errorCode === 'TOKEN_EXPIRED') {
                    toast.error('Your session has expired. Please sign in again.');
                }
                
                // Get current path and check if it's already a signin page
                const currentPath = window.location.pathname;
                const currentSearch = window.location.search;
                
                // Prevent redirect loops
                if (currentPath === '/signin') {
                    return Promise.reject(error);
                }
                
                // Check if we're already handling a redirect
                const searchParams = new URLSearchParams(currentSearch);
                if (searchParams.has('redirect')) {
                    return Promise.reject(error);
                }
                
                // Redirect to signin with current path
                window.location.href = `/signin?redirect=${encodeURIComponent(currentPath)}`;
            }
        }
        
        // Handle other errors
        if (error.response?.status === 403) {
            toast.error('You do not have permission to perform this action');
        } else if (error.code === 'ERR_NETWORK') {
            toast.error('Network error. Please check your connection.');
        }
        
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authApi = {
    register: (data: RegisterData) => api.post('/auth/register', data),
    signin: (data: SignInData) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data: UpdateProfileData) => api.put('/auth/profile', data),
};

// Reward endpoints
export const rewardApi = {
    getAll: () => api.get('/rewards'),
    getById: (id: string) => api.get(`/rewards/${id}`),
    getMyRewards: () => api.get('/rewards/my-rewards'),
    create: (data: any) => api.post('/rewards', data),
    update: (id: string, data: any) => api.put(`/rewards/${id}`, data),
    delete: (id: string) => api.delete(`/rewards/${id}`),
    redeem: (rewardId: string) => transactionApi.redeemReward(rewardId)
};

// Category endpoints
export const categoryApi = {
    getAll: () => api.get('/categories'),
    getRewardsByCategory: (slug: string) => api.get(`/categories/${slug}/rewards`),
    update: (id: string, data: any) => api.patch(`/categories/${id}`, data),
};

// Transaction endpoints
export const transactionApi = {
    getMyTransactions: () => api.get('/transactions/history'),
    redeemReward: (rewardId: string) => api.post(`/transactions/redeem/${rewardId}`),
}; 