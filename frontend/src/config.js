const getBaseUrl = () => {
    // Get raw URL and remove any trailing slashes
    const rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

    // If it doesn't already end in /api, append it
    let finalUrl = rawUrl;
    if (!rawUrl.endsWith('/api')) {
        finalUrl = `${rawUrl}/api`;
    }

    console.log('API_BASE_URL:', finalUrl); // Debugging
    return finalUrl;
};

const API_BASE_URL = getBaseUrl();

export default API_BASE_URL;
