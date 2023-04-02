// /components/MoodTracker/visualize.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoods } from "../../store/features/mood/moodSlice";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { date, time, mood } = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#FFFFFF", padding: "10px", border: "1px solid #CCCCCC" }}>
        <p>{`Date: ${date}`}</p>
        <p>{`Time: ${time}`}</p>
        <p>{`Mood: ${mood}`}</p>
      </div>
    );
  }
  return null;
};

const MoodVisualize = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const moods = useSelector((state) => state.mood.moods);

  useEffect(() => {
    dispatch(getMoods(userId));
  }, [dispatch, userId]);

  // Prepare data for the chart
  const chartData = moods.map((m) => ({
    date: m.date.toDate().toLocaleDateString(),
    time: m.date.toDate().toLocaleTimeString(),
    mood: m.mood,
  }));

  return (
    <div>
      <h2>Mood Visualization</h2>
      <BarChart
        width={1000}
        height={500}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis xAxisId="0" dataKey="date" />
        <XAxis xAxisId="1" dataKey="time" allowDuplicatedCategory={false} />
              <YAxis domain={[0, 10]} />
              <YAxis  domain={[0, 10]} orientation="right" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="mood" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default MoodVisualize;
