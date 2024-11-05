import React, { useState } from 'react';
import './MatchGame.css';

type Card = {
  word: string;
  language: 'english' | 'norwegian';
  isMatched: boolean;
  isRed: boolean;
  isBlue: boolean;
};

const words = [
  { english: 'Have to', norwegian: 'Må' },
  { english: 'Is complaining', norwegian: 'Klager' },
  { english: 'Stomach pains', norwegian: 'Magesmerter' },
  { english: 'Dissy', norwegian: 'Svimmel' },
  { english: 'Flu', norwegian: 'Influensa' },
];

// Function to shuffle the cards
const shuffleCards = (): Card[] => {
  return [...words.flatMap((word) => [
    { word: word.english, language: 'english' as const, isMatched: false, isRed: false, isBlue: false },
    { word: word.norwegian, language: 'norwegian' as const, isMatched: false, isRed: false, isBlue: false }
  ])].sort(() => Math.random() - 0.5);
};

const MatchGame: React.FC = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);

  const handleCardClick = (index: number) => {
    if (cards[index].isMatched || selectedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].isBlue = true; // Set the card to blue when clicked
    setCards(newCards);

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;
      const firstCard = newCards[firstIndex];
      const secondCard = newCards[secondIndex];

      if (
        (firstCard.language === 'english' && secondCard.word === words.find((w) => w.english === firstCard.word)?.norwegian) ||
        (firstCard.language === 'norwegian' && secondCard.word === words.find((w) => w.norwegian === firstCard.word)?.english)
      ) {
        // If cards match, turn them green and make them unclickable
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        newCards[firstIndex].isBlue = false;
        newCards[secondIndex].isBlue = false;
        setCards(newCards);
        setTimeout(() => setSelectedCards([]), 500); // Faster response

        // Check if the game is won (all cards are matched)
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true); // Set the game won state to true
        }
      } else {
        // If cards don't match, turn them red and reset after a short delay
        newCards[firstIndex].isRed = true;
        newCards[secondIndex].isRed = true;
        newCards[firstIndex].isBlue = false;
        newCards[secondIndex].isBlue = false;
        setCards(newCards);

        setTimeout(() => {
          newCards[firstIndex].isRed = false;
          newCards[secondIndex].isRed = false;
          setCards(newCards);
          setSelectedCards([]);
        }, 500); // Faster response
      }
    }
  };

  return (
    <div className="match-game">
      <h2>Word Matching Game</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.isMatched ? 'matched' : card.isRed ? 'red' : card.isBlue ? 'blue' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.word}
          </div>
        ))}
      </div>
      {/* Show congratulatory message and restart button when all cards are matched */}
      {gameWon && (
        <div>
          <div className="congrats-message">Gratulerer! Du matchet alle ordene!</div>
          <button className="restart-button" onClick={() => window.location.reload()}>
            Start på nytt?
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchGame;
