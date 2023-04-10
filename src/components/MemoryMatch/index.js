import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography, Container, Box } from "@mui/material";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ScoreModal from "./ScoreModal";

// Styled component for the card container
const CardContainer = styled(Card)(({ theme, isSelected, isMatched }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "3rem",
  padding: "3rem",
  height: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: isSelected ? "#a1c4fd" : isMatched ? "#b2fefa" : "white",
  cursor: "pointer",
  transition: "all 0.5s ease-in-out",
  "&:hover": {
    backgroundColor: "lightgray",
  },
}));

// Styled components for the front and back of the card
const CardFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
`;

const CardFront = styled(CardFace)`
  transform: rotateY(180deg);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(0deg);
`;

// Component for flipping the card
const FlipCard = ({ isFlipped, front: Front, back: Back }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0)",
      transition: "transform 0.5s",
    }}
  >
    <Front />
    <Back />
  </div>
);

// CSS for selected and matched cards
const selectedCardStyle = css`
  background-color: #a1c4fd;
`;

const matchedCardStyle = css`
  background-color: #b2fefa;
`;

// Main component for the memory match game
const MemoryMatch = () => {
  // Declare state variables
  const cardValues = ["🐶", "🐱", "🐻", "🐼", "🦊", "🐯", "🐷", "🐰", "🐸"];
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([0]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [openScoreModal, setOpenScoreModal] = useState(false);

  // Shuffle the cards on component mount
  useEffect(() => {
    shuffleCards();
  }, []);

  // Open score modal when all cards are matched
  useEffect(() => {
    if (matched.length === cards.length) {
      setOpenScoreModal(true);
    }
  }, [matched, cards, moves]);
// Close the score modal
const closeModal = () => {
  setOpenScoreModal(false);
  };
  
  // Increment the time elapsed every second while there are unmatched cards
  useEffect(() => {
  if (matched.length < cards.length) {
  const timer = setTimeout(() => setTimeElapsed(timeElapsed + 1), 1000);
  return () => clearTimeout(timer);
  }
  }, [timeElapsed, matched, cards]);
  
  // Shuffle the cards and reset the game
  const shuffleCards = () => {
  const shuffled = cardValues.concat(cardValues).sort(() => Math.random() - 0.5);
  setCards(shuffled);
  setSelected([]);
  setMatched([]);
  setMoves(0);
  setTimeElapsed(0);
  };
  
  // Select a card and check for matches
  const selectCard = (index) => {
  // Don't allow selection of more than two cards or the same card twice
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
      // Unflip the cards after 1 second if they don't match
      setTimeout(() => {
        setSelected([]);
      }, 1000);
    }
  }
};

return (
<Container maxWidth="md">
<ScoreModal open={openScoreModal} handleClose={closeModal} moves={moves} timeElapsed={timeElapsed} />
<Box textAlign="center" my={2}>
<Typography variant="h4" gutterBottom>
Memory Match Game
</Typography>
<Typography variant="subtitle1">
Click on the cards to reveal them, and find matching pairs. <br /> Try to complete the game in the shortest time and with the fewest moves!
</Typography>
</Box>
<Grid container justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: "1rem" }}>
<Grid item>
<Button variant="contained" color="primary" onClick={shuffleCards}>
Reset Game
</Button>
</Grid>
<Grid item>
<Typography variant="h6">Moves: {moves}</Typography>
</Grid>
<Grid item>
<Typography variant="h6">Time: {timeElapsed}s</Typography>
</Grid>
    </Grid>

    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: "1rem" }}>
    {/* Map over the cards and create a MemoryMatchCard for each one */}
    {cards.map((card, index) => (
      <Grid item xs={4} sm={3} md={2} key={index}>
        <CardContainer
          onClick={() => selectCard(index)}
          isSelected={selected.includes(index)}
          isMatched={matched.includes(index)}
        >
          {/* Flip the card to show the front or back depending on its state */}
          <FlipCard
            isFlipped={matched.includes(index) || selected.includes(index)}
            front={() => (
              <CardFront>
                <div>
                  <CardContent>{card}</CardContent>
                </div>
              </CardFront>
            )}
            back={() => (
              <CardBack>
                <div>
                  <CardContent>{"❓"}</CardContent>
                </div>
              </CardBack>
            )}
          />
        </CardContainer>
      </Grid>
    ))}
  </Grid>
</Container>
);
};

export default MemoryMatch;