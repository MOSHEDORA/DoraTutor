import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flame } from "lucide-react";
import type { UserStats } from "@/types";

const mockUserId = "user-1"; // In real app, get from auth context

export default function ProgressCards() {
  const { data: stats } = useQuery<UserStats>({
    queryKey: ["/api/users", mockUserId, "stats"],
    queryFn: () => ({
      weeklyGoal: 15,
      hoursCompleted: 12,
      conceptsMastered: 147,
      streak: 28,
    }),
  });

  if (!stats) return null;

  const goalProgress = Math.round((stats.hoursCompleted / stats.weeklyGoal) * 100);
  const strokeDasharray = 175.92;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * goalProgress) / 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card data-testid="weekly-goal-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Weekly Goal</p>
              <p className="text-2xl font-bold text-foreground" data-testid="hours-completed">
                {stats.hoursCompleted}/{stats.weeklyGoal}
              </p>
              <p className="text-sm text-success">hours completed</p>
            </div>
            <div className="relative">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle 
                  cx="32" 
                  cy="32" 
                  r="28" 
                  stroke="var(--muted)" 
                  strokeWidth="4" 
                  fill="none" 
                />
                <circle 
                  cx="32" 
                  cy="32" 
                  r="28" 
                  stroke="var(--primary)" 
                  strokeWidth="4" 
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="progress-ring"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary" data-testid="goal-percentage">
                  {goalProgress}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card data-testid="concepts-mastered-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Concepts Mastered</p>
              <p className="text-2xl font-bold text-foreground" data-testid="concepts-count">
                {stats.conceptsMastered}
              </p>
              <p className="text-sm text-secondary">+23 this week</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Trophy className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card data-testid="streak-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-foreground" data-testid="streak-count">
                {stats.streak}
              </p>
              <p className="text-sm text-accent">days</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Flame className="w-6 h-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
