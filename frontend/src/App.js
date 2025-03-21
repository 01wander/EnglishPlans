import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { UserProvider } from './contexts/UserContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import HomePage from './pages/HomePage';
import AlphabetPage from './pages/AlphabetPage';
import NumbersPage from './pages/NumbersPage';
import ColorsPage from './pages/ColorsPage';
import AnimalsPage from './pages/AnimalsPage';
import MemoryGamePage from './games/MemoryGamePage';
import WordMatchGamePage from './games/WordMatchGamePage';
import ListeningGamePage from './games/ListeningGamePage';
import GreetingsPage from './pages/GreetingsPage';
import SongsPage from './pages/SongsPage';
import FoodPage from './pages/FoodPage';
import BodyPartsPage from './pages/BodyPartsPage';
import UserProfilePage from './pages/UserProfilePage';
import LearningGoalsPage from './pages/LearningGoalsPage';
import FavoritesPage from './pages/FavoritesPage';
import AchievementsPage from './pages/AchievementsPage';
import AudioSettingsPage from './pages/AudioSettingsPage';
import Login from './components/Login';
import BasicLearningPage from './pages/BasicLearningPage';
import SettingsPage from './pages/SettingsPage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url('/background.jpg');
  background-size: cover;
  background-attachment: fixed;
`;

const Content = styled.main`
  flex: 1;
  padding: 30px 0;
`;

const Header = styled.header`
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  text-align: center;
`;

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <AppContainer>
            <ScrollToTopOnMount />
            <Navigation user={user} onLogout={handleLogout} onLogin={handleLoginSuccess} />
            <Content className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/basic" element={<BasicLearningPage />} />
                <Route path="/body-parts" element={<BodyPartsPage />} />
                <Route path="/animals" element={<AnimalsPage />} />
                <Route path="/colors" element={<ColorsPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/profile/goals" element={<LearningGoalsPage />} />
                <Route path="/profile/favorites" element={<FavoritesPage />} />
                <Route path="/profile/achievements" element={<AchievementsPage />} />
                <Route path="/profile/settings" element={<AudioSettingsPage />} />
                <Route path="/alphabet" element={<AlphabetPage />} />
                <Route path="/numbers" element={<NumbersPage />} />
                <Route path="/games/memory" element={<MemoryGamePage />} />
                <Route path="/games/word-match" element={<WordMatchGamePage />} />
                <Route path="/games/listening" element={<ListeningGamePage />} />
                <Route path="/greetings" element={<GreetingsPage />} />
                <Route path="/songs" element={<SongsPage />} />
                <Route path="/food" element={<FoodPage />} />
              </Routes>
            </Content>
            <ScrollToTop />
            <Footer />
          </AppContainer>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App; 