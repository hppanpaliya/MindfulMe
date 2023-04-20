import { useRef, useEffect } from "react";
import { interpolatePoints } from "./utils";

const useDrawing = (color, brushSize) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const drawingHistoryRef = useRef([]);
  const isDrawingRef = useRef(false);
  const redoHistoryRef = useRef([]);

  useEffect(() => {
    prepareCanvas();

    const handleKeyDown = (e) => {
      if (e.key === "z" && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (e.key === "z" && e.ctrlKey) {
        undo();
      } else if (e.key === "s" && e.ctrlKey) {
        e.preventDefault();
        save();
      } else if (e.key === "z" && e.metaKey && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (e.key === "z" && e.metaKey) {
        undo();
      } else if (e.key === "s" && e.metaKey) {
        e.preventDefault();
        save();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    canvas.style.width = `${window.innerWidth * 0.8}px`;
    canvas.style.height = `${window.innerHeight * 0.8}px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
    saveHistory();
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    isDrawingRef.current = true;
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    contextRef.current.prevX = null;
    contextRef.current.prevY = null;
    isDrawingRef.current = false;
    saveHistory();
  };

  const undo = () => {
    if (drawingHistoryRef.current.length > 1) {
      const context = canvasRef.current.getContext("2d");
      redoHistoryRef.current.push(drawingHistoryRef.current.pop());
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const image = new Image();
      image.src =
        drawingHistoryRef.current[drawingHistoryRef.current.length - 1];
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
    }
  };

  const redo = () => {
    if (redoHistoryRef.current.length > 0) {
      const context = canvasRef.current.getContext("2d");
      const lastRedo = redoHistoryRef.current.pop();
      drawingHistoryRef.current.push(lastRedo);
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const image = new Image();
      image.src = lastRedo;
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
    }
  };

  const save = () => {
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "canvas_drawing.png";
    link.click();
  };

  const draw = (e) => {
    if (!isDrawingRef.current) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    const prevX = contextRef.current.prevX || offsetX;
    const prevY = contextRef.current.prevY || offsetY;
    contextRef.current.prevX = offsetX;
    contextRef.current.prevY = offsetY;

    const points = interpolatePoints(prevX, prevY, offsetX, offsetY);

    points.forEach((point) => {
      contextRef.current.lineTo(point.x, point.y);
      contextRef.current.stroke();
      contextRef.current.beginPath();
      contextRef.current.moveTo(point.x, point.y);
    });
  };

  const saveHistory = () => {
    drawingHistoryRef.current.push(canvasRef.current.toDataURL());
  };

  const handleTouchEvent = (e) => {
    e.preventDefault();
    const touch = e.type === "touchend" ? e.changedTouches[0] : e.touches[0];
    const { pageX, pageY } = touch;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const { scrollTop, scrollLeft } = document.documentElement;
    const offsetX = pageX - left - scrollLeft;
    const offsetY = pageY - top - scrollTop;

    const syntheticEvent = { nativeEvent: { offsetX, offsetY } };

    if (e.type === "touchstart") {
      startDrawing(syntheticEvent);
    } else if (e.type === "touchmove") {
      draw(syntheticEvent);
    } else if (e.type === "touchend" || e.type === "touchcancel") {
      finishDrawing();
    } else if (e.type === "touchleave") {
      finishDrawing();
    } else if (e.type === "mousedown") {
      startDrawing(syntheticEvent);
    } else if (e.type === "mouseup") {
      finishDrawing();
    } else if (e.type === "mousemove") {
      draw(syntheticEvent);
    } else if (e.type === "mouseleave") {
      finishDrawing();
    }
  };

  const exportCanvasAsJPG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasRef.current.width;
    canvas.height = canvasRef.current.height;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(canvasRef.current, 0, 0);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "canvas_drawing.jpg";
    link.click();
  };

  const clearCanvas = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return {
    canvasRef,
    contextRef,
    startDrawing,
    finishDrawing,
    draw,
    handleTouchEvent,
    exportCanvasAsJPG,
    clearCanvas,
    undo,
    redo,
    save,
  };
};

export default useDrawing;
