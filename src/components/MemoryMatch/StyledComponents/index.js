import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const StyledGridItem = styled(Grid)`
  display: flex;
  align-items: center;
`;

const CardContainer = styled(Card)(({ theme, isSelected, isMatched }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "3rem",
  padding: "3rem",
  height: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  background: isSelected
    ? "#a1c4fd"
    : isMatched
    ? "#b2fefa"
    : "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
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
  <motion.div
    style={{
      position: "relative",
      transformStyle: "preserve-3d",
    }}
    animate={{
      rotateY: isFlipped ? -180 : 0,
    }}
    transition={{ duration: 0.5 }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        //transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0)",
        transition: "transform 0.5s",
      }}
    >
      <Front />
      <Back />
    </div>
  </motion.div>
);

export const ResetGameButton = ({ shuffleCards }) => (
  <Button variant="contained" color="primary" onClick={shuffleCards}>
    Reset Game
  </Button>
);

export const MovesDisplay = ({ moves }) => (
  <Typography variant="h6">Moves: {moves}</Typography>
);

export const TimeDisplay = ({ timeElapsed }) => (
  <Typography variant="h6">Time: {timeElapsed}s</Typography>
);

export const MemoryMatchCard = ({
  card,
  index,
  selected,
  matched,
  selectCard,
}) => (
  <CardContainer
    onClick={() => selectCard(index)}
    isSelected={selected.includes(index)}
    isMatched={matched.includes(index)}
  >
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
);
