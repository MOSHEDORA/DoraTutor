import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import AIChat from "@/components/dashboard/ai-chat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Target, Clock, User } from "lucide-react";

export default function AITutor() {
  const [language, setLanguage] = useState("");
  const [goals, setGoals] = useState("");
  const [experience, setExperience] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const { toast } = useToast();

  const generatePathMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/ai-tutor/generate-path", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Learning path generated!",
        description: "Your personalized learning path has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Generation failed",
        description: "There was an error generating your learning path. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGeneratePath = () => {
    if (!language || !goals || !experience || !timeCommitment) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to generate your learning path.",
        variant: "destructive",
      });
      return;
    }

    generatePathMutation.mutate({
      language,
      goals: goals.split(',').map(g => g.trim()),
      experience,
      timeCommitment,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header 
          title="AI Tutor" 
          description="Get personalized learning guidance and create custom learning paths" 
        />
        
        <main className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Learning Path Generator */}
            <Card data-testid="path-generator">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center">
                  <BrainCircuit className="w-5 h-5 mr-2 text-primary" />
                  Generate Learning Path
                </h2>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    Programming Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger data-testid="language-select">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Learning Goals</label>
                  <Textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="Enter your learning goals (comma-separated)"
                    rows={3}
                    data-testid="goals-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Experience Level
                  </label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger data-testid="experience-select">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Time Commitment
                  </label>
                  <Select value={timeCommitment} onValueChange={setTimeCommitment}>
                    <SelectTrigger data-testid="time-select">
                      <SelectValue placeholder="How much time can you dedicate?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 hours/day">1-2 hours/day</SelectItem>
                      <SelectItem value="3-4 hours/day">3-4 hours/day</SelectItem>
                      <SelectItem value="5+ hours/day">5+ hours/day</SelectItem>
                      <SelectItem value="weekends only">Weekends only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGeneratePath}
                  disabled={generatePathMutation.isPending}
                  className="w-full"
                  data-testid="generate-path-btn"
                >
                  {generatePathMutation.isPending ? "Generating..." : "Generate Learning Path"}
                </Button>
              </CardContent>
            </Card>

            {/* AI Chat */}
            <AIChat />
          </div>
        </main>
      </div>
    </div>
  );
}
