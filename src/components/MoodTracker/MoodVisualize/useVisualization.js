import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { FormControl, InputLabel, Typography } from "@mui/material";

export const CustomTooltip = ({ active, payload, label }) => {
  const emoticons = ["😭", "😢", "😔", "😐", "🙂", "😀", "😄", "😁", "😆", "😍"];
  if (active && payload && payload.length) {
    const { date, time, mood } = payload[0].payload;
    console.log(payload[0].payload);
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "10px",
          border: "1px solid #CCCCCC",
        }}
      >
        <Typography variant="body1">{`Date: ${date}`}</Typography>
        <Typography variant="body1">{`Time: ${time}`}</Typography>
        <Typography variant="body1">{`Mood: ${emoticons[mood - 1]}`}</Typography>
      </div>
    );
  }
  return null;
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
const emoticons = ["😭", "😢", "😔", "😐", "🙂", "😀", "😄", "😁", "😆", "😍"];

export const yAxisTickFormatter = (value) => {
  console.log([value]);
  return emoticons[value - 1];
};

const filterMoodsByMonthAndYear = (moods, month, year) => {
  return moods.filter((m) => {
    const moodDate = m.date.toDate();
    return moodDate.getMonth() + 1 === month && moodDate.getFullYear() === year;
  });
};

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const prepareChartData = (moods, month, year) => {
  const chartData = Array.from({ length: daysInMonth(month, year) }, (_, i) => ({
    date: `${month}/${i + 1}`,
    mood: null,
    time: null,
    count: 0,
  }));

  filterMoodsByMonthAndYear(moods, month, year).forEach((m) => {
    const moodDate = m.date.toDate();
    const day = moodDate.getDate();
    if (chartData[day - 1].mood === null) {
      chartData[day - 1].mood = m.mood;
      chartData[day - 1].time = moodDate.toLocaleTimeString();
      chartData[day - 1].count = 1;
    } else {
      chartData[day - 1].mood += m.mood;
      chartData[day - 1].count += 1;
    }
  });

  // Calculate the average mood for each day
  chartData.forEach((day) => {
    if (day.mood !== null) {
      day.mood = Math.round(day.mood / day.count);
    }
  });

  return chartData;
};

export const Heading = styled.h2`
  margin-bottom: 5px;
  font-size: 28px;
  font-weight: bold;
  color: #444;

  @media (min-width: 768px) {
    margin-bottom: 0;
    font-size: 36px;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
  align-items: center;
    justify-content: center;
`;

export const Filter = styled(FormControl)`
  margin: 1px;
  @media (min-width: 768px) {
    margin: ;
  }
`;

export const Label = styled(InputLabel)`
  color: #444;
`;
