import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Controls from './Controls';

export default function Canvas() {
  const [size, setSize] = useState({
    width: window.innerWidth - 200,
    height: window.innerHeight,
  });

  const [lastCoords, setLastCoords] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [hue, setHue] = useState(0);

  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const direction = useRef(true);

  const draw = (e) => {
    if (!isDrawing) return;

    // Set styles
    ctx.current.lineJoin = 'round';
    ctx.current.lineCap = 'round';
    ctx.current.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // Draw line
    ctx.current.beginPath();
    ctx.current.moveTo(lastCoords.x, lastCoords.y);
    ctx.current.lineTo(e.pageX, e.pageY);
    ctx.current.closePath();
    ctx.current.stroke();

    setLastCoords({ x: e.pageX, y: e.pageY });

    setHue(hue + 1);
    if (hue >= 360) {
      setHue(0);
    }
    if (ctx.current.lineWidth >= 100 || ctx.current.lineWidth <= 1) {
      direction.current = !direction.current;
    }

    if (direction.current) {
      ctx.current.lineWidth++;
    } else {
      ctx.current.lineWidth--;
    }
  };

  // Resize canvas on window resize
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth - 200, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  });

  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d');
  }, []);

  // Mouse handlers
  const handleMouseMove = (e) => {
    draw(e);
  };

  const handleMouseUp = (e) => {
    switch (e.button) {
      case 0:
        // console.log('left click');
        setIsDrawing(false);
        break;
      case 1:
        // middle click
        break;
      case 2:
        // console.log('right click');
        // ctx.current.reset(); -> Clears the canvas, should be done using a button
        break;
    }
  };

  const handleMouseDown = (e) => {
    switch (e.button) {
      case 0:
        setLastCoords({ x: e.pageX, y: e.pageY });
        setIsDrawing(true);
        break;
      case 2:
        //console.log('Nothing to do here');
        break;
    }
  };

  const handleMouseOut = () => {
    setIsDrawing(false);
  };

  // Button handlers
  const handleClear = () => {
    ctx.current.reset();
  };

  const handleSave = () => {
    const imageUrl = canvasRef.current.toDataURL('image/png');
    const downloadEl = document.createElement('a');
    downloadEl.href = imageUrl;
    downloadEl.download = 'image';
    downloadEl.click();
    downloadEl.remove();
  };

  return (
    <div className="canvas-container">
      <canvas
        id="draw"
        ref={canvasRef}
        width={size.width}
        height={size.height}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseOut={handleMouseOut}
        onContextMenu={(e) => e.preventDefault()}
      />
      <Controls onClear={handleClear} onSave={handleSave} />
    </div>
  );
}
