import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const InsightsWrapper = styled(Box)({
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  justifyContent: "center",
});

const Insight = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  boxShadow: theme.shadows[1],
}));

const Label = styled(Typography)({
  fontWeight: "bold",
});

const Value = styled(Typography)({
  color: "#4caf50",
});

const Insights = ({}) => {
  const { habits } = useSelector((state) => state.habits);
  const completedHabits = habits.filter((habit) => habit.isCompleted).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits
    ? (completedHabits / totalHabits) * 100
    : 0;

  return (
    <InsightsWrapper>
      <Insight>
        <Label>Total Habits:</Label>
        <Value>{totalHabits}</Value>
      </Insight>
      <Insight>
        <Label>Completed Habits:</Label>
        <Value>{completedHabits}</Value>
      </Insight>
      <Insight>
        <Label>Completion Rate:</Label>
        <Value>{completionRate.toFixed(1)}%</Value>
      </Insight>
    </InsightsWrapper>
  );
};
export default Insights;
