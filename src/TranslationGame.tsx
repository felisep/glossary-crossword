import React, { useState } from 'react';
import './TranslationGame.css';

const words = [
  { english: 'narrator', norwegian: 'forteller' },
  { english: 'back', norwegian: 'rygg' },
  { english: 'paws', norwegian: 'poter' },
  { english: 'dare', norwegian: 'våger' },
  { english: 'perhaps', norwegian: 'kanskje' },
  { english: 'tiny', norwegian: 'bitte liten' }
];

const TranslationGame: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array(words.length).fill(''));
  const [isCorrect, setIsCorrect] = useState<boolean[]>(Array(words.length).fill(false));

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const newIsCorrect = [...isCorrect];
    newIsCorrect[index] = value.toLowerCase() === words[index].english.toLowerCase();
    setIsCorrect(newIsCorrect);
  };

  return (
    <div className="translation-game">
      <h2>Translation Game</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            <span>{word.norwegian}: </span>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={isCorrect[index] ? 'correct' : ''}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationGame;
