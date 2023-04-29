import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Grid, Slider, Stack, Tooltip, MenuItem, Select, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
import { Box } from "@mui/material";
import { SketchPicker } from "react-color";
import Modal from "./Modal";
// OKAY and CANCEL Icons MUI
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";
import Eraser from "../../assets/images/eraser.svg";
// Pen Icons MUI
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

const ControlWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "1rem",
});

const InvertedEraser = styled("img")({
  width: "1.5rem",
  height: "1.5rem",
});

const BrushSizeLabel = styled("div")({
  marginLeft: "1rem",
  fontWeight: 600,
  minWidth: "1.5rem",
  textAlign: "center",
});

const CustomButton = ({ title, children, onClick, sx, color }) => (
  <Tooltip title={title}>
    <Button variant="contained" color={color} onClick={onClick} sx={sx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "2rem",
          height: "1.5rem",
        }}
      >
        {children}
      </Box>
    </Button>
  </Tooltip>
);

const Controls = ({ color, setColor, brushSize, setBrushSize, contextRef, exportCanvasAsJPG, clearCanvas, undo, redo, save }) => {
  const buttonSx = {
    fontSize: "0.75rem",
    marginBottom: { xs: "0.5rem", sm: "0" },
    marginRight: { xs: 0, sm: "0.5rem" },
  };

  const iconWithTextSx = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "3rem",
  };

  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(color);
  const [cancelColor, setCancleColor] = useState(color);
  const [pickerType, setPickerType] = useState("sketch");
  const inputRef = React.createRef();

  const openBuiltInPicker = () => {
    if (pickerType === "built-in") {
      inputRef.current.click();
    } else {
      handleColorClick();
    }
  };

  const handleColorClick = () => {
    setShowPicker((prevState) => !prevState);
    setCancleColor(color);
  };

  const handleColorChange = (updatedColor) => {
    setColor(updatedColor);
    contextRef.current.strokeStyle = updatedColor;
  };

  const handleColorChangeTemp = (updatedColor) => {
    setTempColor(updatedColor.hex);
  };

  const handleColorAccept = () => {
    handleColorChange(tempColor);
    setShowPicker(false);
  };

  const handleColorCancel = () => {
    handleColorChange(cancelColor);
    setShowPicker(false);
  };

  const handleEraser = () => {
    console.log("eraser");
    if (color !== "#FFFFFF") {
      console.log(color);
      console.log("tempset");
      setTempColor(contextRef.current.strokeStyle);
    }
    handleColorChange("#FFFFFF");
  };

  const handlePen = () => {
    handleColorChange(tempColor);
  };

  const handlePickerTypeChange = (event) => {
    setPickerType(event.target.value);
  };

  const handleBuiltInColorChange = (e) => {
    handleColorChange(e.target.value);
  };
  const handleClickOutsideModal = (e) => {
    setShowPicker(false);
    handleColorChange(tempColor);
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
      <Stack direction={{ xs: "coloumn", sm: "row" }} alignItems="center" sx={{ marginTop: "1rem" }}>
        <ControlWrapper sx={{ marginBottom: "1rem" }}>
          <Tooltip title="Color Picker Type">
            <Select value={pickerType} onChange={handlePickerTypeChange} sx={{ minWidth: "120px" }}>
              <MenuItem value="built-in">Built-in Color Picker</MenuItem>
              <MenuItem value="sketch">Advanced Color Picker</MenuItem>
            </Select>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;
          <Tooltip title="Color Picker">
            <div style={{ position: "relative", border: "2px solid #777" }}>
              {pickerType !== "built-in" ? (
                <div
                  onClick={openBuiltInPicker}
                  style={{
                    cursor: "pointer",
                    height: "24px",
                    width: "24px",
                    padding: "0",
                    backgroundColor: color,
                  }}
                ></div>
              ) : (
                ``
              )}
              {pickerType === "built-in" ? (
                <input
                  id="colorInput"
                  type="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    setTempColor(e.target.value);
                    contextRef.current.strokeStyle = e.target.value;
                  }}
                  style={{
                    cursor: "pointer",
                    height: "24px",
                    width: "24px",
                    padding: "0",
                    backgroundColor: color,
                  }}
                  ref={inputRef}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                ``
              )}
              {showPicker && pickerType === "sketch" && (
                <Modal onClose={handleClickOutsideModal}>
                  <SketchPicker color={tempColor} onChange={handleColorChangeTemp} />
                  <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: "1rem" }}>
                    <Grid item xs>
                      <Tooltip title="Cancel">
                        <Button onClick={handleColorCancel} variant="contained" fullWidth>
                          <CancelIcon />
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs>
                      <Tooltip title="Accept">
                        <Button onClick={handleColorAccept} variant="contained" fullWidth>
                          <CheckIcon />
                        </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Modal>
              )}
            </div>
          </Tooltip>
        </ControlWrapper>
        <ControlWrapper sx={{ marginBottom: "1rem" }}>
          <Typography htmlFor="brushSizeInput" sx={{ marginRight: "0.5rem" }}>
            Brush size:
          </Typography>

          <Slider
            id="brushSizeInput"
            value={brushSize}
            min={1}
            max={30}
            onChange={(e, newValue) => {
              setBrushSize(newValue);
              contextRef.current.lineWidth = newValue;
            }}
            style={{ width: "80px" }}
          />
          <BrushSizeLabel>{brushSize}</BrushSizeLabel>
        </ControlWrapper>
      </Stack>
      <Grid container direction={{ xs: "column", sm: "row" }} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Eraser" onClick={handleEraser} sx={buttonSx}>
              <InvertedEraser src={Eraser} alt="Eraser" />
            </CustomButton>
          </Grid>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Pen" onClick={handlePen} sx={buttonSx}>
              <ModeEditRoundedIcon />
            </CustomButton>
          </Grid>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Undo (Ctrl + Z)" onClick={undo} sx={buttonSx}>
              <UndoIcon />
            </CustomButton>
          </Grid>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Redo (Ctrl + Shift + Z)" onClick={redo} sx={buttonSx}>
              <RedoIcon />
            </CustomButton>
          </Grid>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Save as PNG (Ctrl + S)" onClick={save} sx={buttonSx}>
              <SaveIcon /> PNG
            </CustomButton>
          </Grid>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Save as JPG" onClick={exportCanvasAsJPG} sx={buttonSx}>
              <ImageIcon /> JPG
            </CustomButton>
          </Grid>
          <Grid item xs={4} sm={2}>
            <CustomButton title="Clear Canvas" onClick={clearCanvas} sx={buttonSx} color="error">
              <DeleteIcon />
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Controls;
