import React from "react";

const Canvas = ({
  canvasRef,
  startDrawing,
  finishDrawing,
  draw,
  handleTouchEvent,
}) => (
  <canvas
    className="drawingAppCanvas"
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    onTouchStart={handleTouchEvent}
    onTouchMove={handleTouchEvent}
    onTouchEnd={handleTouchEvent}
    onTouchCancel={handleTouchEvent}
    ref={canvasRef}
  ></canvas>
);

export default Canvas;
