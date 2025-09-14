import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import type { LearningPath } from "@/types";

export default function LearningPaths() {
  const { data: paths = [], isLoading } = useQuery<LearningPath[]>({
    queryKey: ["/api/learning-paths"],
    queryFn: () => [
      {
        id: "1",
        title: "Full-Stack Python Development",
        description: "Master Python from basics to web development with Django and Flask",
        language: "Python",
        difficulty: "intermediate",
        totalModules: 8,
      },
      {
        id: "2", 
        title: "Modern JavaScript & React",
        description: "Learn JavaScript ES6+ and React for building modern web applications",
        language: "JavaScript",
        difficulty: "beginner",
        totalModules: 6,
      },
      {
        id: "3",
        title: "Java Enterprise Development",
        description: "Build enterprise applications with Java, Spring Boot, and microservices",
        language: "Java",
        difficulty: "advanced",
        totalModules: 10,
      },
      {
        id: "4",
        title: "Data Structures & Algorithms",
        description: "Master computer science fundamentals for technical interviews",
        language: "Python",
        difficulty: "intermediate",
        totalModules: 12,
      },
    ],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64">
          <Header title="Learning Paths" description="Explore structured learning journeys" />
          <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6 border border-border animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header 
          title="Learning Paths" 
          description="Explore structured learning journeys tailored to your goals" 
        />
        
        <main className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card data-testid="total-paths">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{paths.length}</p>
                <p className="text-sm text-muted-foreground">Available Paths</p>
              </CardContent>
            </Card>
            <Card data-testid="in-progress">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card data-testid="completed">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card data-testid="total-modules">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold text-foreground">
                  {paths.reduce((sum, path) => sum + path.totalModules, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Modules</p>
              </CardContent>
            </Card>
          </div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path, index) => (
              <Card key={path.id} className="hover:shadow-md transition-shadow" data-testid={`path-${path.id}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge 
                      variant={
                        path.difficulty === "beginner" ? "secondary" :
                        path.difficulty === "intermediate" ? "default" : "destructive"
                      }
                      data-testid={`difficulty-${path.id}`}
                    >
                      {path.difficulty}
                    </Badge>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      path.language === "Python" ? "bg-accent" :
                      path.language === "JavaScript" ? "bg-secondary" :
                      path.language === "Java" ? "bg-primary" : "bg-muted"
                    }`}>
                      <span className="text-xs font-bold text-white">
                        {path.language.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`path-title-${path.id}`}>
                    {path.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`path-description-${path.id}`}>
                    {path.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span data-testid={`modules-count-${path.id}`}>{path.totalModules} modules</span>
                    <span data-testid={`language-${path.id}`}>{path.language}</span>
                  </div>

                  {/* Mock progress for the first path */}
                  {index === 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    variant={index === 0 ? "default" : "outline"}
                    data-testid={`start-path-${path.id}`}
                  >
                    {index === 0 ? "Continue Learning" : "Start Path"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
