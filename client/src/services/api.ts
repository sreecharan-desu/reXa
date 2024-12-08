import axios from 'axios';
import { CONFIG } from '../config/config';

// Create and export the base api instance
export const api = axios.create({
    baseURL: CONFIG.API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Auth API endpoints
export const authApi = {
    signin: (credentials: { email: string; password: string }) => 
        api.post('/auth/login', credentials),
    register: (userData: { name: string; email: string; password: string }) => 
        api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data: any) => api.put('/auth/profile', data)
};

// Reward API endpoints
export const rewardApi = {
    getAll: () => api.get('/rewards'),
    getById: (id: string) => api.get(`/rewards/${id}`),
    create: (data: any) => api.post('/rewards', data),
    update: (id: string, data: any) => api.put(`/rewards/${id}`, data),
    delete: (id: string) => api.delete(`/rewards/${id}`),
    getMyRewards: () => api.get('/rewards/user/my-rewards')
};

// Add interfaces for type safety
interface Transaction {
  id: string;
  rewardId: string;
  date: string;
  // add other transaction properties as needed
}

// Transaction API endpoints
export const transactionApi = {
    getHistory: () => api.get<Transaction[]>('/transactions/history'),
    redeemReward: (rewardId: string) => api.post<Transaction>(`/transactions/redeem/${rewardId}`)
};

// Category API endpoints
export const categoryApi = {
    getAll: () => api.get('/categories'),
    getRewardsByCategory: (slug: string) => api.get(`/categories/${slug}/rewards`),
    create: (data: any) => api.post('/categories', data)
};

// Request API endpoints
export const requestApi = {
    create: (rewardId: string) => api.post(`/requests/${rewardId}`),
    getMyRequests: () => api.get('/requests/my-requests'),
    getById: (id: string) => api.get(`/requests/${id}`),
    respond: (id: string, response: any) => api.patch(`/requests/${id}/respond`, response)
};