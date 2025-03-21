import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// 获取 CSRF Token 的函数
const getCSRFToken = () => {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// 创建一个 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 允许跨域请求携带 cookie
});

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加 CSRF Token
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    // 添加认证 Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 获取 CSRF Token
export const fetchCSRFToken = async () => {
  try {
    const response = await api.get('/csrf/');
    return response.data.csrfToken;
  } catch (error) {
    console.error('获取 CSRF Token 失败:', error);
    throw error;
  }
};

// 登录
export const login = async (username, password) => {
  try {
    // 先获取 CSRF Token
    await fetchCSRFToken();
    
    const response = await api.post('/auth/login/', {
      username,
      password,
    });
    
    // 保存 token 到 localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 注册
export const register = async (username, password, email) => {
  try {
    // 先获取 CSRF Token
    await fetchCSRFToken();
    
    const response = await api.post('/auth/register/', {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
};

// 登出
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default api; 