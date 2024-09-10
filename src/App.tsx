import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MatchGame from './MatchGame';
import TranslationGame from './TranslationGame';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="main-title">Language Learning Games - Week 37</h1>
        <nav className="menu">
          <Link to="/match-game" className="menu-item">Word Matching Game</Link>
          <Link to="/translation-game" className="menu-item">Translation Game</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/match-game" element={<MatchGame />} />
            <Route path="/translation-game" element={<TranslationGame />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
