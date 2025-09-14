import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BrainCircuit, LayoutDashboard, Bot, BookOpen, PlayCircle, Cpu,
  Upload, Settings, Trophy, Flame
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "AI Tutor", href: "/ai-tutor", icon: Bot },
  { name: "Learning Paths", href: "/learning-paths", icon: BookOpen },
  { name: "Visualizations", href: "/visualizations", icon: PlayCircle },
  { name: "LLM Model", href: "/llm-model", icon: Cpu },
];

const languages = [
  { name: "Python", color: "bg-accent", progress: 85 },
  { name: "Java", color: "bg-primary", progress: 72 },
  { name: "JavaScript", color: "bg-secondary", progress: 68 },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border shadow-sm" data-testid="sidebar">
      <div className="flex flex-col h-full">
        {/* Logo and Header */}
        <div className="flex items-center px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">CodeMentor AI</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 custom-scrollbar overflow-y-auto">
          <div className="space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                Main
              </h3>
              <div className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link key={item.name} href={item.href} 
                      className={cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "text-sidebar-primary bg-sidebar-primary/10"
                          : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )} data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Programming Languages */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                Languages
              </h3>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center px-2 py-2 text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors cursor-pointer" data-testid={`lang-${lang.name.toLowerCase()}`}>
                    <div className={cn("w-4 h-4 mr-3 rounded-sm flex items-center justify-center", lang.color)}>
                      <span className="text-xs font-bold text-white">
                        {lang.name.substring(0, 2)}
                      </span>
                    </div>
                    {lang.name}
                    <span className={cn(
                      "ml-auto text-xs px-1.5 py-0.5 rounded-full",
                      lang.progress >= 80 ? "bg-success/20 text-success" :
                      lang.progress >= 60 ? "bg-accent/20 text-accent" :
                      "bg-secondary/20 text-secondary"
                    )}>
                      {lang.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                <button className="flex items-center w-full px-2 py-2 text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors" data-testid="upload-content">
                  <Upload className="w-4 h-4 mr-3" />
                  Upload Content
                </button>
                <button className="flex items-center w-full px-2 py-2 text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors" data-testid="preferences">
                  <Settings className="w-4 h-4 mr-3" />
                  Preferences
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-sidebar-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
