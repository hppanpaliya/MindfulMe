import React, { useState } from "react";
import "./DrawingApp.css";
import Canvas from "./Canvas";
import Controls from "./Controls";
import useDrawing from "./useDrawing";

const DrawingApp = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

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
  } = useDrawing(color, brushSize);

  return (
    <div className="drawingApp">
      <Canvas
        canvasRef={canvasRef}
        startDrawing={startDrawing}
        finishDrawing={finishDrawing}
        draw={draw}
        handleTouchEvent={handleTouchEvent}
      />
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
      />
    </div>
  );
};

export default DrawingApp;
