import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoods } from "../../store/features/mood/moodSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
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
        <p>{`Date: ${date}`}</p>
        <p>{`Time: ${time}`}</p>
        <p>{`Mood: ${emoticons[mood - 1]}`}</p>
      </div>
    );
  }
  return null;
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


const MoodVisualize = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const moods = useSelector((state) => state.mood.moods);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  

  const [windowWidth, windowHeight] = useWindowSize();

  const chartWidth = windowWidth * 0.8;
  const chartHeight = windowHeight * 0.45;



  useEffect(() => {
    dispatch(getMoods(userId));
  }, [dispatch, userId]);


  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };


  const emoticons = ["😭", "😢", "😔", "😐", "🙂", "😀", "😄", "😁", "😆", "😍"];

  const yAxisTickFormatter = (value) => {
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
// Prepare data for the chart
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




  return (
  <div>
    <h2>Mood Visualization</h2>
    <div style={{ marginBottom: "20px" }}>
      <FormControl variant="outlined" style={{ marginRight: "20px" }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={year}
          onChange={handleYearChange}
          label="Year"
        >
          {Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i).map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel>Month</InputLabel>
        <Select
          value={month}
          onChange={handleMonthChange}
          label="Month"
        >
          {[...Array(12)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {new Date(0, i + 1, 0).toLocaleString("default", {
                month: "long",
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
{/*  xs:550 sm:850 md:1200 lg:1450 xl:1550      */}
<Box className="chart" width={chartWidth} height={chartHeight} style={{ margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[1, 10]} tickFormatter={yAxisTickFormatter} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="mood" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
  </div>
);
};

export default MoodVisualize;