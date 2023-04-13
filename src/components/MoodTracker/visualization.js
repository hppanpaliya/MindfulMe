import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoods } from "../../store/features/mood/moodSlice";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion"; // Import framer-motion library

import { CustomTooltip, useWindowSize, yAxisTickFormatter, prepareChartData } from "./Visualization/useVisualization";
import {  Heading, Filters, Filter, Label } from "./Visualization/useVisualization";

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

  const handleMonthChange = ({ target: { value } }) => {
    setMonth(value);
  };

  const handleYearChange = ({ target: { value } }) => {
    setYear(value);
  };

  const chartData = prepareChartData(moods, month, year);

  // Define animations using framer-motion
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  const chartVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <motion.div // Wrap the UI in a motion div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
        <Heading>Mood Visualization</Heading>
        <Filters>
          <Filter variant="outlined">
            <Label>Year</Label>
            <Select value={year} onChange={handleYearChange}>
              {Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i).map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </Filter>
          <Filter variant="outlined">
            <Label>Month</Label>
            <Select value={month} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </Filter>
        </Filters>
        <Box // Use a motion div to animate the chart
          component={motion.div}
          variants={chartVariants}
          initial="initial"
          animate="animate"
          sx={{ width: "100%", height: "100%" }}
        >
          <ResponsiveContainer width={chartWidth} height={chartHeight}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 10]}     type="number" tickFormatter={yAxisTickFormatter} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="mood" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
    </motion.div>
  );
};

export default MoodVisualize;
