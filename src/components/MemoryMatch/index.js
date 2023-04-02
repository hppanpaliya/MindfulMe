import React, { useState, useEffect } from "react";
import "./MemoryMatch.css";

const cardValues = ["🐶", "🐱", "🐻",  "🐼", "🦊", "🐯", "🐷", "🐰", "🐸"];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([0]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (matched.length === cards.length) {
      alert(`Game over! You made ${moves} moves.`);
    }
  }, [matched, cards, moves]);

  const shuffleCards = () => {
    const shuffled = cardValues
      .concat(cardValues)
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelected([]);
    setMatched([]);
    setMoves(0);
  };

  const selectCard = (index) => {
    if (selected.length === 2 || selected.includes(index)) {
      return;
    }
    setSelected([...selected, index]);
    if (selected.length === 1) {
      setMoves(moves + 1);
      if (cards[selected[0]] === cards[index]) {
        setMatched([...matched, selected[0], index]);
        setSelected([]);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }
  };
  

  return (
    <div>
      <div className="memory-match-header">
        <button onClick={shuffleCards}>Reset Game</button>
        <p>Moves: {moves}</p>
      </div>
      <div className="memory-match-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => selectCard(index)}
            className={`memory-match-card ${
              matched.includes(index) ? "matched" : ""
            } ${selected.includes(index) ? "selected" : ""}`}
          >
            {matched.includes(index) || selected.includes(index) ? card : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;
