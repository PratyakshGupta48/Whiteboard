import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import config from './config';
import './styles.css';
import { FaPencilAlt, FaEraser, FaRegCircle, FaRegSquare, FaShareAlt } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineHexagon } from 'react-icons/md';

const socket = io(config.BACKEND_URL, config.SOCKET_OPTIONS);

const Whiteboard = () => {
  const { boardId } = useParams();
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(20);
  const [penStyle, setPenStyle] = useState('round');  
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctxRef.current = ctx;

    const drawGrid = () => {
      const gridSize = 25;
      ctx.strokeStyle = '#f2f2f2';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const draw = ({ x0, y0, x1, y1, color, lineWidth, penStyle }) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = penStyle;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    };

    socket.emit('join', boardId);

    socket.on('load', (board) => {
      drawGrid();
      board.forEach(draw);
    });

    socket.on('drawing', draw);

    socket.on('clear', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
    });

    drawGrid();

    return () => {
      socket.off('load');
      socket.off('drawing');
      socket.off('clear');
    };
  }, [boardId]);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = lineWidth;
      ctxRef.current.lineCap = penStyle;
    }
  }, [color, lineWidth, penStyle]);

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
    const currentLineWidth = tool === 'eraser' ? eraserWidth : lineWidth;
    const currentPenStyle = penStyle;

    socket.emit('drawing', {
      x0: x,
      y0: y,
      x1: offsetX,
      y1: offsetY,
      color: currentColor,
      lineWidth: currentLineWidth,
      penStyle: currentPenStyle,
      boardId
    });

    lastPos.current = { x: offsetX, y: offsetY };

    ctxRef.current.strokeStyle = currentColor;
    ctxRef.current.lineWidth = currentLineWidth;
    ctxRef.current.lineCap = currentPenStyle;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const handleMouseUp = () => isDrawing.current = false;

  const handleClear = () => {
    socket.emit('clear', { boardId });
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gridSize = 20;
      ctx.strokeStyle = '#f2f2f2';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://whiteboard-io.netlify.app/board/'+boardId).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="whiteboard-container">
      {isCopied && <div className='Copied'>Link Copied to Clipboard <br/> Share it to see changes in real time !</div>}

      <div className="toolbar">

        <button onClick={() => setTool('pencil')}><FaPencilAlt /></button>
        <input type="range" min="1" max="50" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)}/>
        <div style={{display:'flex', flexDirection:'row'}}>
          <button onClick={() => setPenStyle('round')}><FaRegCircle/></button>
          <button onClick={() => setPenStyle('square')}><FaRegSquare/></button>
          <button onClick={() => setPenStyle('butt')}><MdOutlineHexagon/></button>
        </div>

        <div style={{backgroundColor:'#dbdbdb', height:1, marginTop:7, marginBottom:7}}></div>

        <button onClick={() => setTool('eraser')}><FaEraser/></button>
        <input type="range" min="1" max="50" value={eraserWidth} onChange={(e) => setEraserWidth(e.target.value)} />

        <div style={{backgroundColor:'#dbdbdb', height:1, marginTop:7, marginBottom:7}}></div>

        <div style={{display:'flex', flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
          <IoIosColorPalette size={25} color='#000000' />
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div style={{backgroundColor:'#dbdbdb', height:1, marginTop:7, marginBottom:7}}></div>

        <button onClick={handleClear}><FaEraser style={{paddingRight:13}} />All</button>

        <div style={{backgroundColor:'#dbdbdb', height:1, marginTop:7, marginBottom:7}}></div>

        <button onClick={copyToClipboard}><FaShareAlt/></button>

      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default Whiteboard;
