import { getFullUrl } from './config';

// 更新收藏状态
export const updateFavoriteStatus = async (category, itemId, isFavorite) => {
  try {
    const response = await fetch(getFullUrl(`/api/favorites/${category}/${itemId}`), {
      method: isFavorite ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '更新收藏状态失败');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 更新学习进度
export const updateLearningProgress = async (category, itemId, status) => {
  try {
    const response = await fetch(getFullUrl(`/api/progress/${category}/${itemId}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '更新学习进度失败');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}; 