import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MemoryCanvasProps {
  width?: number;
  height?: number;
}

export default function MemoryCanvas({ width = 800, height = 600 }: MemoryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set up colors
      const stackColor = "#F59E0B";
      const heapColor = "#06B6D4";
      const backgroundColor = "#F1F5F9";
      const borderColor = "#CBD5E1";

      // Draw background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Stack visualization (left side)
      const stackX = 50;
      const stackY = 50;
      const stackWidth = 150;
      const stackHeight = height - 100;

      // Stack container
      ctx.strokeStyle = stackColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(stackX, stackY, stackWidth, stackHeight);

      // Stack label
      ctx.fillStyle = stackColor;
      ctx.font = "16px Inter";
      ctx.fillText("Stack", stackX + 10, stackY + 25);

      // Draw stack frames (animated)
      const numFrames = 5;
      const frameHeight = 40;
      for (let i = 0; i < numFrames; i++) {
        const frameY = stackY + stackHeight - (i + 1) * (frameHeight + 10) - 20;
        const animOffset = isPlaying ? Math.sin(frame * 0.1 + i * 0.5) * 5 : 0;
        
        ctx.fillStyle = stackColor;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(
          stackX + 10 + animOffset, 
          frameY, 
          stackWidth - 20, 
          frameHeight
        );
        ctx.globalAlpha = 1;

        // Frame text
        ctx.fillStyle = "#000";
        ctx.font = "12px JetBrains Mono";
        ctx.fillText(`frame_${i}()`, stackX + 15, frameY + 25);
      }

      // Heap visualization (right side)
      const heapX = width - 250;
      const heapY = 50;
      const heapWidth = 200;
      const heapHeight = height - 100;

      // Heap container
      ctx.strokeStyle = heapColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(heapX, heapY, heapWidth, heapHeight);

      // Heap label
      ctx.fillStyle = heapColor;
      ctx.font = "16px Inter";
      ctx.fillText("Heap", heapX + 10, heapY + 25);

      // Draw heap objects (animated)
      const objects = [
        { x: 20, y: 60, w: 60, h: 40, label: "obj1" },
        { x: 90, y: 60, w: 80, h: 40, label: "array" },
        { x: 20, y: 120, w: 100, h: 60, label: "object" },
        { x: 130, y: 120, w: 50, h: 60, label: "data" },
      ];

      objects.forEach((obj, i) => {
        const pulse = isPlaying ? 0.5 + 0.3 * Math.sin(frame * 0.08 + i * 0.7) : 0.8;
        
        ctx.fillStyle = heapColor;
        ctx.globalAlpha = pulse;
        ctx.fillRect(
          heapX + obj.x, 
          heapY + obj.y, 
          obj.w, 
          obj.h
        );
        ctx.globalAlpha = 1;

        // Object label
        ctx.fillStyle = "#000";
        ctx.font = "10px JetBrains Mono";
        ctx.fillText(obj.label, heapX + obj.x + 5, heapY + obj.y + 20);
      });

      // Central explanation
      const centerX = (stackX + stackWidth + heapX) / 2;
      const centerY = height / 2;

      ctx.fillStyle = "#FFF";
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      const boxWidth = 200;
      const boxHeight = 120;
      ctx.fillRect(centerX - boxWidth/2, centerY - boxHeight/2, boxWidth, boxHeight);
      ctx.strokeRect(centerX - boxWidth/2, centerY - boxHeight/2, boxWidth, boxHeight);

      // Explanation text
      ctx.fillStyle = "#000";
      ctx.font = "14px Inter";
      ctx.textAlign = "center";
      ctx.fillText("Memory Management", centerX, centerY - 30);
      
      ctx.font = "12px Inter";
      ctx.fillText("Stack: Local variables", centerX, centerY - 5);
      ctx.fillText("& function calls", centerX, centerY + 10);
      ctx.fillText("Heap: Dynamic memory", centerX, centerY + 30);

      // Reset text alignment
      ctx.textAlign = "start";

      if (isPlaying) {
        frame++;
      }
    };

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, width, height]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4" data-testid="memory-canvas">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-border rounded-lg"
        data-testid="visualization-canvas"
      />
      
      <div className="flex space-x-2">
        <Button onClick={handlePlay} data-testid="play-pause-btn">
          {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button variant="secondary" onClick={handleReset} data-testid="reset-btn">
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
