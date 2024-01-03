import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Controls from './Controls';

const CONTROLS_WIDTH = 300;

export default function Canvas() {
  const [size, setSize] = useState({
    width: window.innerWidth - CONTROLS_WIDTH,
    height: window.innerHeight,
  });
  
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const strokeWidthSliderRef = useRef(null);
  const colorSliderRef = useRef(null);
  const crazyModeToggleRef = useRef(null);
  
  const lastCoords = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const direction = useRef(true);
  const hue = useRef(0);
  const crazyMode = useRef(false);

  const draw = (e) => {
    if (!isDrawing.current) return;

    // Set styles
    ctx.current.lineJoin = 'round';
    ctx.current.lineCap = 'round';
    ctx.current.strokeStyle = `hsl(${hue.current}, 100%, 50%)`;

    // Draw line
    ctx.current.beginPath();
    ctx.current.moveTo(lastCoords.current.x, lastCoords.current.y);
    ctx.current.lineTo(e.pageX, e.pageY);
    ctx.current.closePath();
    ctx.current.stroke();

    lastCoords.current = { x: e.pageX, y: e.pageY };

    if (crazyMode.current) {
      hue.current = hue.current + 1;

      if (hue.current >= 360) hue.current = 0;
      if (ctx.current.lineWidth >= 100 || ctx.current.lineWidth <= 1) {
        direction.current = !direction.current;
      }

      if (direction.current) {
        ctx.current.lineWidth++;
      } else {
        ctx.current.lineWidth--;
      }
    }
  };

  // Resize canvas on window resize
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth - CONTROLS_WIDTH, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  });

  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d');
    ctx.current.lineWidth = strokeWidthSliderRef.current.value;
    hue.current = colorSliderRef.current.value;
  }, []);

  // Mouse handlers
  const handleMouseMove = (e) => {
    draw(e);
  };

  const handleMouseUp = (e) => {
    switch (e.button) {
      case 0:
        isDrawing.current = false;
        break;
    }
  };

  const handleMouseDown = (e) => {
    switch (e.button) {
      case 0:
        lastCoords.current = { x: e.pageX, y: e.pageY };
        isDrawing.current = true;
        break;
    }
  };

  const handleMouseOut = () => {
    isDrawing.current = false;
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

  // Slider/toggle handlers
  const handleStrokeWidthChange = (e) => {
    ctx.current.lineWidth = e.target.value;
  }

  const handleColorChange = (e) => {
    hue.current = e.target.value;
  }

  const handleCrazyModeChange = (e) => {
    crazyMode.current = e.target.checked;
    if (crazyMode.current) hue.current = colorSliderRef.current.value;
  }

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
      />
      <Controls
        onClear={handleClear}
        onSave={handleSave}
        onStrokeWidthChange={handleStrokeWidthChange}
        onColorChange={handleColorChange}
        onCrazyModeChange={handleCrazyModeChange}
        strokeWidthSliderRef={strokeWidthSliderRef}
        colorSliderRef={colorSliderRef}
        crazyModeToggleRef={crazyModeToggleRef}
      />
    </div>
  );
}
