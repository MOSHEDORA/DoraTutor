import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const mockModules = [
  {
    id: "1",
    title: "Python Basics",
    description: "Variables, data types, control structures",
    status: "completed",
    progress: 100,
  },
  {
    id: "2", 
    title: "Object-Oriented Programming",
    description: "Classes, inheritance, polymorphism",
    status: "in-progress",
    progress: 75,
  },
  {
    id: "3",
    title: "Web Frameworks",
    description: "Django, Flask, FastAPI",
    status: "locked",
    progress: 0,
  },
  {
    id: "4",
    title: "Database Integration",
    description: "SQLAlchemy, PostgreSQL, MongoDB",
    status: "locked",
    progress: 0,
  },
];

export default function LearningPath() {
  return (
    <Card className="p-6 mb-8" data-testid="learning-path">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground" data-testid="path-title">
          Current Learning Path: Full-Stack Python Development
        </h2>
        <Button variant="link" className="text-primary hover:text-primary/80 text-sm font-medium" data-testid="view-all-paths">
          View All Paths
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {mockModules.map((module) => (
          <div 
            key={module.id}
            className={cn(
              "bg-muted rounded-lg p-4",
              module.status === "in-progress" && "ring-2 ring-primary",
              module.status === "locked" && "opacity-60"
            )}
            data-testid={`module-${module.id}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                module.status === "completed" && "text-success bg-success/20",
                module.status === "in-progress" && "text-primary bg-primary/20",
                module.status === "locked" && "text-muted-foreground bg-border"
              )}>
                {module.status === "completed" && "Completed"}
                {module.status === "in-progress" && "In Progress"}
                {module.status === "locked" && "Locked"}
              </span>
              {module.status === "completed" && <CheckCircle className="w-4 h-4 text-success" />}
              {module.status === "in-progress" && <PlayCircle className="w-4 h-4 text-primary animate-pulse-slow" />}
              {module.status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
            </div>
            <h3 className={cn(
              "font-medium mb-2",
              module.status === "locked" ? "text-muted-foreground" : "text-foreground"
            )} data-testid={`module-title-${module.id}`}>
              {module.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3" data-testid={`module-description-${module.id}`}>
              {module.description}
            </p>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full",
                  module.status === "completed" && "bg-success",
                  module.status === "in-progress" && "bg-primary",
                  module.status === "locked" && "bg-border"
                )}
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
