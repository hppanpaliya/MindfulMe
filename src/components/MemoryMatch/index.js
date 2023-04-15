import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography, Container, Box } from "@mui/material";
import styled from "@emotion/styled";
import ScoreModal from "./ScoreModal";
import flipcard from "../../assets/audio/background/flipcard.mp3";
import cardflip from "../../assets/audio/background/cardflip.mp3";
import gameWin from "../../assets/audio/background/game-win.wav";
import shufflingCards from "../../assets/audio/background/shuffling-cards.mp3";
import cardMatch from "../../assets/audio/background/cardMatch.mp3";
import { VolumeUp, VolumeOff } from "@mui/icons-material";

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

const ResetGameButton = ({ shuffleCards }) => (
  <Button variant="contained" color="primary" onClick={shuffleCards}>
    Reset Game
  </Button>
);

const SoundControlButton = ({ isMuted, toggleMute }) => (
  <Button variant="contained" color="primary" onClick={toggleMute}>
    {isMuted ? <VolumeOff /> : <VolumeUp />}
    {isMuted ? "Turn Off" : "Turn On"}
  </Button>
);

const MovesDisplay = ({ moves }) => (
  <Typography variant="h6">Moves: {moves}</Typography>
);

const TimeDisplay = ({ timeElapsed }) => (
  <Typography variant="h6">Time: {timeElapsed}s</Typography>
);

const MemoryMatchCard = ({ card, index, selected, matched, selectCard }) => (
  <Grid item xs={4} sm={3} md={2} key={index}>
    <CardContainer onClick={() => selectCard(index)} isSelected={selected.includes(index)} isMatched={matched.includes(index)}>
      <FlipCard
        isFlipped={matched.includes(index) || selected.includes(index)}
        front={() => (
          <CardFront>
            <CardContent>{card}</CardContent>
          </CardFront>
        )}
        back={() => (
          <CardBack>
            <CardContent>{"❓"}</CardContent>
          </CardBack>
        )}
      />
    </CardContainer>
  </Grid>
);

const MemoryMatch = () => {
// Declare state variables
  const cardValues = ["🐶", "🐱", "🐻", "🐼", "🦊", "🐯", "🐷", "🐰", "🐸"];
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([0]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Shuffle the cards on component mount
  useEffect(() => {
    shuffleCards();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open score modal when all cards are matched
  useEffect(() => {
    if (matched.length === cards.length) {
      //if(isMuted) new Audio(gameWin).play();
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
    if (isMuted) new Audio(shufflingCards).play();
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
    if (selected.length === 2 || selected.includes(index) || matched.includes(index)) {
      return;
    }
    if (isMuted) new Audio(flipcard).play();
    setSelected([...selected, index]);
    if (selected.length === 1) {
      setMoves(moves + 1);
      if (cards[selected[0]] === cards[index]) {
        setMatched([...matched, selected[0], index]);
        setSelected([]);
        // play audio with 0.5 seconds delay
        setTimeout(() => {
          if (matched.length === cards.length - 2) {
            if (isMuted) new Audio(gameWin).play();
          } else {
            if (isMuted) new Audio(cardMatch).play();
          }
        }, 600);
        //if(isMuted) new Audio(cardMatch).play();
      } else {
        // Unflip the cards after 1 second if they don't match
        setTimeout(() => {
          setSelected([]);
          if (isMuted) new Audio(cardflip).play();
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
          <ResetGameButton shuffleCards={shuffleCards} />
        </Grid>
        <Grid item>
          <SoundControlButton isMuted={isMuted} toggleMute={() => setIsMuted(!isMuted)} />
        </Grid>
        <Grid item>
          <MovesDisplay moves={moves} />
        </Grid>
        <Grid item>
          <TimeDisplay timeElapsed={timeElapsed} />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: "1rem" }}>
        {/* Map over the cards and create a MemoryMatchCard for each one */}
        {cards.map((card, index) => (
          <MemoryMatchCard
            key={index}
            card={card}
            index={index}
            selected={selected}
            matched={matched}
            selectCard={selectCard}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default MemoryMatch;
