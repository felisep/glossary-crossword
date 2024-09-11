import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MatchGame from './MatchGame';
import TranslationGame from './TranslationGame';
import './App.css';
import { getWeekNumber } from './utils/dates';
import { SpeedInsights } from '@vercel/speed-insights/next';


const App: React.FC = () => {
  const [currentDate] = useState(new Date());

  const week = getWeekNumber(currentDate);

  return (
    <Router>
       <SpeedInsights />
      <div className="app-container">
        <h1 className="main-title">Language Learning Games - Week {week}</h1>
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
