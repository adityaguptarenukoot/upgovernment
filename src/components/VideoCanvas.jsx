import { useRef, useEffect, useState } from 'react';

const VideoCanvas = ({ videoFile }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });

  useEffect(() => {
    if (videoFile && videoRef.current) {
      const url = URL.createObjectURL(videoFile);
      videoRef.current.src = url;
      
      // Get actual video dimensions when loaded
      videoRef.current.onloadedmetadata = () => {
        const video = videoRef.current;
        setDimensions({
          width: video.videoWidth,
          height: video.videoHeight
        });
      };
      
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  // Sync canvas dimensions with video
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
    }
  }, [dimensions]);

  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;
    
    ctx.clearRect(0, 0, width, height);

    // Calculate responsive positions (percentage-based)
    // Left side bounding box (green) - IN lane
    const leftBox = {
      x: width * 0.00,      // 12% from left
      y: height * 0.35,     // 28% from top
      width: width * 0.52,  // 9% of canvas width
      height: height * 0.40 // 11% of canvas height
    };

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.strokeRect(leftBox.x, leftBox.y, leftBox.width, leftBox.height);
    
    // Draw vehicle ID label
    ctx.fillStyle = '#00ff00';
    ctx.font = `${Math.max(12, width * 0.011)}px Arial`;
    ctx.fillText('IN', leftBox.x + 5, leftBox.y - 5);

    // Right side bounding box (red) - OUT lane
    const rightBox = {
      x: width * 0.55,      // 79% from left
      y: height * 0.35,     // 35% from top
      width: width * 0.52,  // 8% of canvas width
      height: height * 0.35 // 10% of canvas height
    };

    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.strokeRect(rightBox.x, rightBox.y, rightBox.width, rightBox.height);
    
    ctx.fillStyle = '#ff0000';
    ctx.fillText('OUT', rightBox.x + 5, rightBox.y - 5);
  };

  useEffect(() => {
    const interval = setInterval(drawBoundingBoxes, 100);
    return () => clearInterval(interval);
  }, [dimensions]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default VideoCanvas;
