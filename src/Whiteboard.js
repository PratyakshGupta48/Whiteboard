import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('https://mysterious-river-36918-10bc48c38923.herokuapp.com');

const Whiteboard = () => {
  const { boardId } = useParams();
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctxRef.current = ctx;

    const draw = ({ x0, y0, x1, y1, color, lineWidth }) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    };

    socket.emit('join', boardId);

    socket.on('load', (board) => {
      board.forEach(draw);
    });

    socket.on('drawing', draw);

    return () => {
      socket.off('load');
      socket.off('drawing');
    };
  }, [boardId]);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    isDrawing.current = true;
    lastPos.current = { x: offsetX, y: offsetY };
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const { x, y } = lastPos.current;
    const currentColor = tool === 'eraser' ? 'white' : color;
    const currentLineWidth = tool === 'eraser' ? 20 : lineWidth;

    socket.emit('drawing', {
      x0: x,
      y0: y,
      x1: offsetX,
      y1: offsetY,
      color: currentColor,
      lineWidth: currentLineWidth,
      boardId
    });

    lastPos.current = { x: offsetX, y: offsetY };

    ctxRef.current.strokeStyle = currentColor;
    ctxRef.current.lineWidth = currentLineWidth;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="whiteboard-container">
      <div className="toolbar">
        <button onClick={() => setTool('pencil')}>Pencil</button>
        <button onClick={() => setTool('eraser')}>Eraser</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input
          type="range"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp} // Handle the case where the mouse leaves the canvas
      ></canvas>
    </div>
  );
};

export default Whiteboard;
