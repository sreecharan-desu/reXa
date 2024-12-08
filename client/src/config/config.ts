const isDevelopment = import.meta.env.DEV;

export const CONFIG = {
    API_URL: isDevelopment 
        ? 'http://localhost:5000/api'                    // Local development
        : 'https://rex-api-two.vercel.app/api',         // Production
    APP_NAME: 'reX • Reward Exchange',
    TOKEN_KEY: 'rex_token',
}; 