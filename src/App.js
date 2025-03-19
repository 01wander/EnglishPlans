import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AlphabetPage from './pages/AlphabetPage';
import NumbersPage from './pages/NumbersPage';
import ColorsPage from './pages/ColorsPage';
import AnimalsPage from './pages/AnimalsPage';
import MemoryGamePage from './games/MemoryGamePage';
import WordMatchGamePage from './games/WordMatchGamePage';
import ListeningGamePage from './games/ListeningGamePage';

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

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Content className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alphabet" element={<AlphabetPage />} />
            <Route path="/numbers" element={<NumbersPage />} />
            <Route path="/colors" element={<ColorsPage />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/games/memory" element={<MemoryGamePage />} />
            <Route path="/games/word-match" element={<WordMatchGamePage />} />
            <Route path="/games/listening" element={<ListeningGamePage />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App; 