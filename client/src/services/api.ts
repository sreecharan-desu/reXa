import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Auth endpoints
export const authApi = {
    register: (data: RegisterData) => axiosInstance.post('/auth/register', data),
    signin: (data: SignInData) => axiosInstance.post('/auth/login', data),
    getProfile: () => axiosInstance.get('/auth/profile'),
    updateProfile: (data: UpdateProfileData) => axiosInstance.put('/auth/profile', data),
};

// Reward endpoints
export const rewardApi = {
    getAll: () => axiosInstance.get('/rewards'),
    getById: (id: string) => axiosInstance.get(`/rewards/${id}`),
    getMyRewards: () => axiosInstance.get('/rewards/my-rewards'),
    create: (data: any) => axiosInstance.post('/rewards', data),
    update: (id: string, data: any) => axiosInstance.put(`/rewards/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`/rewards/${id}`),
    redeem: (rewardId: string) => axiosInstance.post(`/transactions/redeem`, { rewardId }),
};

// Category endpoints
export const categoryApi = {
    getAll: () => axiosInstance.get('/categories'),
    getRewardsByCategory: (slug: string) => axiosInstance.get(`/categories/${slug}/rewards`),
    update: (id: string, data: any) => axiosInstance.patch(`/categories/${id}`, data),
};

// Transaction endpoints
export const transactionApi = {
    redeemReward: (rewardId: string) => 
        axiosInstance.post('/transactions/redeem', { rewardId }),
    getMyTransactions: () => axiosInstance.get('/transactions/history'),
}; 