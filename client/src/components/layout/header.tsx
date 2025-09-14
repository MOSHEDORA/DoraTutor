import { Bell, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-8 py-4" data-testid="header">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">{title}</h1>
          <p className="text-muted-foreground mt-1" data-testid="page-description">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" data-testid="notifications">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="search">
            <Search className="w-5 h-5" />
          </Button>
          <Button className="flex items-center space-x-2" data-testid="ask-ai-tutor">
            <MessageCircle className="w-4 h-4" />
            <span>Ask AI Tutor</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
