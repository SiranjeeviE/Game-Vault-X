const getBaseUrl = () => {
    const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    // If the URL is provided but doesn't end with /api, append it
    if (import.meta.env.VITE_API_URL && !rawUrl.endsWith('/api')) {
        return `${rawUrl}/api`;
    }
    return rawUrl;
};

const API_BASE_URL = getBaseUrl();

export default API_BASE_URL;
