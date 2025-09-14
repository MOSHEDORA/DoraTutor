import { Card, CardContent } from "@/components/ui/card";
import { Check, Play, Upload, MessageCircle } from "lucide-react";

const activities = [
  {
    id: "1",
    type: "completed",
    title: "Completed: Python Classes & Objects",
    description: "2 hours ago • 98% accuracy",
    icon: Check,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    id: "2",
    type: "watched",
    title: "Watched: Memory Management Visualization",
    description: "5 hours ago • 12 min duration",
    icon: Play,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "3",
    type: "uploaded",
    title: "Uploaded: Python Best Practices PDF",
    description: "Yesterday • Processing complete",
    icon: Upload,
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    id: "4",
    type: "chat",
    title: "AI Tutor Session: Inheritance Concepts",
    description: "Yesterday • 25 min conversation",
    icon: MessageCircle,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
];

const recommendations = [
  {
    id: "1",
    title: "Practice: Polymorphism",
    description: "Complete the inheritance module to unlock polymorphism concepts",
    priority: "High Priority",
    priorityColor: "bg-primary/20 text-primary",
    borderColor: "border-primary/20",
    bgColor: "bg-primary/5",
    duration: "Est. 45 minutes",
    difficulty: "Difficulty: Medium",
  },
  {
    id: "2",
    title: "Interview Prep: OOP Questions",
    description: "Practice common object-oriented programming interview questions",
    priority: "Recommended",
    priorityColor: "bg-secondary/20 text-secondary",
    borderColor: "border-secondary/20",
    bgColor: "bg-secondary/5",
    duration: "Est. 30 minutes",
    difficulty: "15 questions",
  },
  {
    id: "3",
    title: "Visualization: Stack vs Heap",
    description: "Explore memory allocation patterns through interactive visualization",
    priority: "Interactive",
    priorityColor: "bg-accent/20 text-accent",
    borderColor: "border-accent/20",
    bgColor: "bg-accent/5",
    duration: "Est. 20 minutes",
    difficulty: "Hands-on Learning",
  },
];

export default function ActivityFeed() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Recent Activity */}
      <Card data-testid="recent-activity">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        </div>
        <CardContent className="p-6 space-y-4 max-h-80 custom-scrollbar overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3" data-testid={`activity-${activity.id}`}>
              <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground" data-testid={`activity-title-${activity.id}`}>
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground" data-testid={`activity-description-${activity.id}`}>
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Upcoming & Recommendations */}
      <Card data-testid="recommendations">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recommended Next Steps</h2>
        </div>
        <CardContent className="p-6 space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className={`p-4 ${rec.bgColor} border ${rec.borderColor} rounded-lg`}
              data-testid={`recommendation-${rec.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground" data-testid={`rec-title-${rec.id}`}>
                  {rec.title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${rec.priorityColor}`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3" data-testid={`rec-description-${rec.id}`}>
                {rec.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span data-testid={`rec-duration-${rec.id}`}>{rec.duration}</span>
                <span data-testid={`rec-difficulty-${rec.id}`}>{rec.difficulty}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
