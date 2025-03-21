import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // 用户信息
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // 音频设置
  const [audioSettings, setAudioSettings] = useState(() => {
    const saved = localStorage.getItem('audioSettings');
    return saved ? JSON.parse(saved) : {
      volume: 1,
      rate: 1,
      pitch: 1
    };
  });

  // 收藏的内容
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : {
      bodyParts: [],
      animals: [],
      colors: [],
      numbers: []
    };
  });

  // 学习进度
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {
      bodyParts: {},
      animals: {},
      colors: {},
      numbers: {}
    };
  });

  // 学习记录
  const [learningHistory, setLearningHistory] = useState(() => {
    const saved = localStorage.getItem('learningHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // 保存数据到 localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // 当用户登出时，清除其他相关数据
      localStorage.removeItem('audioSettings');
      localStorage.removeItem('favorites');
      localStorage.removeItem('progress');
      localStorage.removeItem('learningHistory');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('audioSettings', JSON.stringify(audioSettings));
    }
  }, [audioSettings, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('progress', JSON.stringify(progress));
    }
  }, [progress, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('learningHistory', JSON.stringify(learningHistory));
    }
  }, [learningHistory, user]);

  // 登录
  const login = async (userData) => {
    try {
      if (userData.token) {
        localStorage.setItem('token', userData.token);
      }
      
      setUser(userData);
      
      // 如果有音频设置，更新它
      if (userData.audio_settings) {
        setAudioSettings(userData.audio_settings);
      }
      
      // 如果有收藏数据，更新它
      if (userData.favorites) {
        setFavorites(userData.favorites);
      }
      
      // 如果有进度数据，更新它
      if (userData.progress) {
        setProgress(userData.progress);
      }
      
      // 如果有学习历史，更新它
      if (userData.learning_history) {
        setLearningHistory(userData.learning_history);
      }
      
      return true;
    } catch (error) {
      console.error('登录错误:', error);
      return false;
    }
  };

  // 登出
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // 重置所有状态到默认值
    setAudioSettings({
      volume: 1,
      rate: 1,
      pitch: 1
    });
    setFavorites({
      bodyParts: [],
      animals: [],
      colors: [],
      numbers: []
    });
    setProgress({
      bodyParts: {},
      animals: {},
      colors: {},
      numbers: {}
    });
    setLearningHistory([]);
  };

  // 更新音频设置
  const updateAudioSettings = (newSettings) => {
    setAudioSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  // 更新收藏
  const updateFavorites = (category, item, isFavorite) => {
    setFavorites(prev => {
      const newFavorites = { ...prev };
      if (isFavorite) {
        newFavorites[category] = [...new Set([...newFavorites[category], item])];
      } else {
        newFavorites[category] = newFavorites[category].filter(i => i !== item);
      }
      return newFavorites;
    });
  };

  // 更新进度
  const updateProgress = (category, itemId, status) => {
    setProgress(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [itemId]: status
      }
    }));
  };

  // 添加学习记录
  const addLearningHistory = (record) => {
    setLearningHistory(prev => [
      {
        ...record,
        timestamp: new Date().toISOString()
      },
      ...prev
    ].slice(0, 100)); // 只保留最近100条记录
  };

  // 获取学习统计
  const getStatistics = () => {
    const stats = {
      totalItems: 0,
      completedItems: 0,
      favoriteItems: 0
    };

    Object.keys(progress).forEach(category => {
      const categoryProgress = progress[category];
      const categoryFavorites = favorites[category] || [];
      
      stats.totalItems += Object.keys(categoryProgress).length;
      stats.completedItems += Object.values(categoryProgress).filter(status => status === 'completed').length;
      stats.favoriteItems += categoryFavorites.length;
    });

    return stats;
  };

  const value = {
    user,
    audioSettings,
    favorites,
    progress,
    learningHistory,
    login,
    logout,
    updateAudioSettings,
    updateFavorites,
    updateProgress,
    addLearningHistory,
    getStatistics
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 