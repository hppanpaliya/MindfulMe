import React from "react";

const Controls = ({ color, setColor, brushSize, setBrushSize, contextRef, exportCanvasAsJPG, clearCanvas, undo, save, toggleFullscreen }) => (
  <>
  <div className="drawingAppControls">
    <div className="control-wrapper">
      <label htmlFor="colorInput">Color:</label>
      <input
        id="colorInput"
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          contextRef.current.strokeStyle = e.target.value;
        }}
      />
    </div>
    <div className="control-wrapper">
      <label htmlFor="brushSizeInput">Brush size:</label>
      <input
        id="brushSizeInput"
        className="drawingAppRangeInput"
        type="range"
        min="1"
        max="30"
        value={brushSize}
        onChange={(e) => {
          setBrushSize(e.target.value);
          contextRef.current.lineWidth = e.target.value;
        }}
      />
    </div>

    <div className="buttons-wrapper">
      <div className="control-wrapper">
        <button className="drawingAppButton" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </div>
      <div className="control-wrapper">
        <button className="drawingAppButton" onClick={undo}>
          Undo (Ctrl + Z)
        </button>
      </div>

      <div className="control-wrapper">
        <button className="drawingAppButton" onClick={save}>
          Save PNG (Ctrl + S)
        </button>
      </div>
      <div className="control-wrapper">
        <button className="drawingAppButton" onClick={exportCanvasAsJPG}>
          Save JPG
        </button>
      </div>

    </div>
    </div>

    </>
);

export default Controls;
