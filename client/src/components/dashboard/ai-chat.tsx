import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { Bot, Send } from "lucide-react";

const mockUserId = "user-1";

export default function AIChat() {
  const { messages, input, setInput, sendMessage, isLoading } = useChat(mockUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Mock messages for demonstration
  const displayMessages = messages.length > 0 ? messages : [
    {
      id: "1",
      role: "assistant" as const,
      content: "Hi! I noticed you're working on Object-Oriented Programming. Would you like me to explain the concept of inheritance with a practical example?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2", 
      role: "user" as const,
      content: "Yes, that would be helpful! Can you show me with Python code?",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: "3",
      role: "assistant" as const,
      content: "Absolutely! Here's a simple example:\n\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return f\"{self.name} says Woof!\"\n```\n\nThis shows how the Dog class inherits from Animal and overrides the speak method.",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
    }
  ];

  return (
    <Card data-testid="ai-chat">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          AI Tutor Chat
        </h2>
      </div>
      <CardContent className="p-0">
        <div className="p-6 space-y-4 h-80 custom-scrollbar overflow-y-auto">
          {displayMessages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'justify-end' : ''
            }`} data-testid={`message-${message.id}`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`rounded-lg p-3 max-w-sm ${
                message.role === 'assistant' 
                  ? 'bg-muted animate-slide-in' 
                  : 'bg-primary text-primary-foreground'
              }`}>
                <p className="text-sm whitespace-pre-wrap code-font">
                  {message.content}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-white">JD</span>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about programming..."
              disabled={isLoading}
              className="flex-1"
              data-testid="chat-input"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} data-testid="send-message">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
