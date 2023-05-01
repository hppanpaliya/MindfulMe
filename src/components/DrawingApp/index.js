import React, { useState } from "react";
import "./DrawingApp.css";
import Canvas from "./Canvas";
import Controls from "./Controls";
import useDrawing from "./useDrawing";
import { IconButton, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRef } from "react";

const DrawingApp = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const containerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const {
    canvasRef,
    contextRef,
    startDrawing,
    finishDrawing,
    draw,
    handleTouchEvent,
    exportCanvasAsJPG,
    clearCanvas,
    save,
    undo,
    redo,
  } = useDrawing(color, brushSize);

  return (
    <div className="drawingApp" ref={containerRef} style={{ height: `calc(${window.innerHeight}px - 50px - 1rem)` }}>
      <div ref={topRef}></div>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          top: "10vh",
          right: 0,
        }}
      >
        <IconButton onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })}>
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          bottom: "10vh",
          right: 0,
        }}
      >
        <IconButton onClick={() => bottomRef.current.scrollIntoView({ behavior: "smooth" })}>
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
      <Controls
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        contextRef={contextRef}
        exportCanvasAsJPG={exportCanvasAsJPG}
        clearCanvas={clearCanvas}
        save={save}
        undo={undo}
        redo={redo}
      />
      <Canvas canvasRef={canvasRef} startDrawing={startDrawing} finishDrawing={finishDrawing} draw={draw} handleTouchEvent={handleTouchEvent} />
      <div ref={bottomRef}></div>
    </div>
  );
};

export default DrawingApp;
