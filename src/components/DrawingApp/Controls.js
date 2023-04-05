import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Slider, Stack } from "@mui/material";
const ControlWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "1rem",
});
const BrushSizeLabel = styled("div")({
  marginLeft: "1rem",
  fontWeight: 600,
  minWidth: "1.5rem",
  textAlign: "center",
});

const Controls = ({ color, setColor, brushSize, setBrushSize, contextRef, exportCanvasAsJPG, clearCanvas, undo, save }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
        <ControlWrapper>
          <label htmlFor="colorInput" style={{ marginRight: "0.5rem" }}>
            Color:
          </label>
          <input
            id="colorInput"
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              contextRef.current.strokeStyle = e.target.value;
            }}
            style={{ marginRight: "1rem", height: "24px", width: "24px", padding: "0" }}
          />
        </ControlWrapper>
        <ControlWrapper>
          <label htmlFor="brushSizeInput" style={{ marginRight: "0.5rem" }}>
            Brush size:
          </label>
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
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" sx={{ marginTop: "1rem", marginLeft: { sm: "1rem" } }}>
        <Button
          variant="contained"
          color="error"
          onClick={clearCanvas}
          sx={{ fontSize: "0.75rem", marginBottom: { xs: "0.5rem", sm: "0" }, marginRight: { xs: 0, sm: "0.5rem" } }}
        >
          Clear Canvas
        </Button>
        <Button
          variant="contained"
          onClick={undo}
          sx={{ fontSize: "0.75rem", marginBottom: { xs: "0.5rem", sm: "0" }, marginRight: { xs: 0, sm: "0.5rem" } }}
        >
          Undo (Ctrl + Z)
        </Button>
        <Button
          variant="contained"
          onClick={save}
          sx={{ fontSize: "0.75rem", marginBottom: { xs: "0.5rem", sm: "0" }, marginRight: { xs: 0, sm: "0.5rem" } }}
        >
          Save PNG (Ctrl + S)
        </Button>
        <Button
          variant="contained"
          onClick={exportCanvasAsJPG}
          sx={{ fontSize: "0.75rem", marginBottom: { xs: "0.5rem", sm: "0" }, marginRight: { xs: 0, sm: "0.5rem" } }}
        >
          Save JPG
        </Button>
      </Stack>
    </Stack>
  );
};

export default Controls;
