import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoods } from "../../../store/features/mood/moodSlice";
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
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Box,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import {
    CustomTooltip,
    useWindowSize,
    yAxisTickFormatter,
    prepareChartData,
} from "./useVisualization";
import {
    Heading,
    Filters,
    Filter,
    Label,
} from "./useVisualization";
import { useTheme, useMediaQuery } from "@mui/material";

const MoodVisualize = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.uid);
    const moods = useSelector((state) => state.mood.moods);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Initialize the current year and month
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    // Get window size for responsive chart dimensions
    const [windowWidth, windowHeight] = useWindowSize();
    if (isMobile) {
        var chartWidth = windowWidth ;
        var chartHeight = windowHeight * 0.45;
    } else {
        var chartWidth = windowWidth * 0.8;
        var chartHeight = windowHeight * 0.50;
    }

    // Fetch moods data from the store
    useEffect(() => {
        dispatch(getMoods(userId));
    }, [dispatch, userId]);

    // Update selected month and year
    const handleMonthChange = ({ target: { value } }) => {
        setMonth(value);
    };

    const handleYearChange = ({ target: { value } }) => {
        setYear(value);
    };

    // Prepare chart data based on the selected month and year
    const chartData = prepareChartData(moods, month, year);

    // Define framer-motion animation variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
    };

    const chartVariants = {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
    };

    return (
        <motion.div // Animate the container using framer-motion
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            <Filters>
                {/* Render year and month selection dropdowns */}
                <Filter variant="outlined">
                    <Label>Year</Label>
                    <Select
                        value={year}
                        onChange={handleYearChange}
                        sx={{ margin: 1 }}
                    >
                        {Array.from(
                            { length: currentYear - 2000 + 1 },
                            (_, i) => currentYear - i
                        ).map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </Select>
                </Filter>
                <Filter variant="outlined">
                    <Label>Month</Label>
                    <Select
                        value={month}
                        onChange={handleMonthChange}
                        sx={{ margin: 1 }}
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (m) => (
                                <MenuItem key={m} value={m}>
                                    {m}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </Filter>
            </Filters>
            {/* Animate the chart using framer-motion */}
            <Box
                component={motion.div}
                variants={chartVariants}
                initial="initial"
                animate="animate"
                sx={{ width: "100%", height: "100%" }}
            >
                {/* Render the bar chart */}
                <ResponsiveContainer width={chartWidth} height={chartHeight}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                            domain={[1, 10]}
                            type="number"
                            tickFormatter={yAxisTickFormatter}
                        />
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
