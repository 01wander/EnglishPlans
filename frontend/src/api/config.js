export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    register: '/register/',
    login: '/login/',
    logout: '/logout/',
    userInfo: '/user/info/',
    content: '/content/',
    progress: '/progress/',
};

export const getFullUrl = (endpoint) => `${API_BASE_URL}${endpoint}`; 