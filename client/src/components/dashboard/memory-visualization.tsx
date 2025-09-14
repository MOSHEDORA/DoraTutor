import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, PlayCircle } from "lucide-react";

export default function MemoryVisualization() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Reset after animation
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleReset = () => {
    setIsPlaying(false);
  };

  return (
    <Card data-testid="memory-visualization">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <PlayCircle className="w-5 h-5 mr-2 text-secondary" />
            Memory Allocation Visualization
          </span>
          <Button variant="link" className="text-sm text-primary hover:text-primary/80 font-medium" data-testid="view-fullscreen">
            View Full Screen
          </Button>
        </h2>
      </div>
      <CardContent className="p-6">
        <div className="bg-muted rounded-lg h-64 flex items-center justify-center relative overflow-hidden" data-testid="visualization-canvas">
          {/* Stack Visualization */}
          <div className="absolute left-8 top-4 bottom-4 w-20">
            <div className="bg-accent/20 border-2 border-accent rounded-lg h-full relative">
              <div className="absolute top-2 left-2 text-xs font-medium text-accent">Stack</div>
              <div className="absolute bottom-4 left-2 right-2 space-y-1">
                <div className={`bg-accent h-6 rounded ${isPlaying ? 'animate-float' : ''}`} style={{animationDelay: '0s'}} />
                <div className={`bg-accent h-6 rounded ${isPlaying ? 'animate-float' : ''}`} style={{animationDelay: '0.5s'}} />
                <div className={`bg-accent h-6 rounded ${isPlaying ? 'animate-float' : ''}`} style={{animationDelay: '1s'}} />
              </div>
            </div>
          </div>
          
          {/* Heap Visualization */}
          <div className="absolute right-8 top-4 bottom-4 w-32">
            <div className="bg-secondary/20 border-2 border-secondary rounded-lg h-full relative">
              <div className="absolute top-2 left-2 text-xs font-medium text-secondary">Heap</div>
              <div className="absolute top-8 left-2 right-2 bottom-2 grid grid-cols-3 gap-1">
                <div className={`bg-secondary rounded ${isPlaying ? 'animate-pulse-slow' : ''}`} style={{animationDelay: '0s'}} />
                <div className={`bg-secondary rounded ${isPlaying ? 'animate-pulse-slow' : ''}`} style={{animationDelay: '0.3s'}} />
                <div className={`bg-secondary rounded ${isPlaying ? 'animate-pulse-slow' : ''}`} style={{animationDelay: '0.6s'}} />
                <div className={`bg-secondary rounded ${isPlaying ? 'animate-pulse-slow' : ''}`} style={{animationDelay: '0.9s'}} />
              </div>
            </div>
          </div>
          
          {/* Central explanation */}
          <div className="text-center">
            <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
              <p className="text-sm font-medium text-foreground mb-2">Memory Management</p>
              <p className="text-xs text-muted-foreground">Stack: Local variables & function calls</p>
              <p className="text-xs text-muted-foreground">Heap: Dynamic memory allocation</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-2">
          <Button onClick={handlePlay} disabled={isPlaying} data-testid="play-visualization">
            <Play className="w-3 h-3 mr-1" />
            Play
          </Button>
          <Button variant="secondary" onClick={handleReset} disabled={isPlaying} data-testid="reset-visualization">
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
