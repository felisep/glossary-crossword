import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MatchGame from './MatchGame';
import TranslationGame from './TranslationGame';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Language Learning Games</h1>
        <nav>
          <ul>
            <li>
              <Link to="/match-game">Word Matching Game</Link>
            </li>
            <li>
              <Link to="/translation-game">Translation Game</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/match-game" element={<MatchGame />} />
          <Route path="/translation-game" element={<TranslationGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
