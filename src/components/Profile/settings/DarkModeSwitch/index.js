import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Switch } from "@mui/material";
import { setDarkMode, selectDarkMode } from "../../../../store/features/darkMode/darkModeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  let darkMode = useSelector(selectDarkMode);

  const handleDarkModeChange = () => {
    dispatch(setDarkMode(!darkMode));
    console.log("Dark mode changed to: ", !darkMode);
  };

  // const handleDarkModeChange = (event) => {
  //   dispatch(setDarkMode(event.target.checked));
  //   console.log("Dark mode changed to: ", event.target.checked);
  // };

  return (
    // <FormControlLabel
    //   control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
    //   label=""
    //   sx={{
    //     "& .MuiTypography-root": {
    //       color: darkMode ? "#fff" : "rgba(0, 0, 0, 0.87)",
    //     },
    //   }}
    // />
    <IconButton sx={{ ml: 1 }} onClick={handleDarkModeChange} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeSwitch;
