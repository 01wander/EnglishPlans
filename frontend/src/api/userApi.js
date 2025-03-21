import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// 创建一个 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器，为每个请求添加 token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 更新收藏状态
export const updateFavoriteStatus = async (category, itemId, isFavorite) => {
  try {
    const method = isFavorite ? 'post' : 'delete';
    const response = await api[method](`/favorites/${category}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating favorite status:', error);
    throw error;
  }
};

// 更新学习进度
export const updateLearningProgress = async (category, itemId) => {
  try {
    const response = await api.post(`/progress/${category}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating learning progress:', error);
    throw error;
  }
};

export default api; 