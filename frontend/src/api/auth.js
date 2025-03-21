import { API_ENDPOINTS, getFullUrl } from './config';

// 获取 CSRF token
const getCsrfToken = async () => {
    const response = await fetch(getFullUrl('/csrf/'), {
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data.csrfToken;
    }
    return null;
};

export const login = async (username, password) => {
    try {
        const response = await fetch(getFullUrl(API_ENDPOINTS.login), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || '登录失败');
        }

        return data;
    } catch (error) {
        console.error('登录错误:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(getFullUrl(API_ENDPOINTS.logout), {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.cookie.split('csrftoken=')[1]?.split(';')[0] || '',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('登出失败');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const register = async (username, password, password2) => {
    try {
        const response = await fetch(getFullUrl(API_ENDPOINTS.register), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.cookie.split('csrftoken=')[1]?.split(';')[0] || '',
            },
            body: JSON.stringify({ username, password, password2 }),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || '注册失败');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}; 