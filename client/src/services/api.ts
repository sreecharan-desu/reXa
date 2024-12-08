import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

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