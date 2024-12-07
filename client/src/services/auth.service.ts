import { api } from './api';

export const authService = {
    async login(email: string, password: string) {
        const response = await api.post('/auth/signin', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', `Bearer ${response.data.token}`);
        }
        return response.data;
    },

    async register(name: string, email: string, password: string) {
        const response = await api.post('/auth/register', {
            name,
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', `Bearer ${response.data.token}`);
        }
        return response.data;
    },

    getToken() {
        return localStorage.getItem('token');
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/signin';
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};