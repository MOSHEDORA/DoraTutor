import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  BrainCircuit, Code, Database, Settings, Zap, 
  Activity, BarChart3, Cpu, MessageSquare, FileText 
} from "lucide-react";

export default function LLMModel() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerateResponse = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate local AI processing
    setTimeout(() => {
      const responses = {
        python: `# Python Code Example
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    
    return sequence

# Usage
print(fibonacci(10))  # Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

This function demonstrates recursive mathematical concepts and list manipulation in Python.`,
        javascript: `// JavaScript Code Example
function createCounter() {
    let count = 0;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => count = 0
    };
}

// Usage
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue());  // 2

This example shows closures and object-oriented patterns in JavaScript.`,
        java: `// Java Code Example
public class BinarySearchTree {
    private Node root;
    
    private class Node {
        int data;
        Node left, right;
        
        Node(int data) {
            this.data = data;
            left = right = null;
        }
    }
    
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private Node insertRec(Node root, int data) {
        if (root == null) {
            root = new Node(data);
            return root;
        }
        
        if (data < root.data)
            root.left = insertRec(root.left, data);
        else if (data > root.data)
            root.right = insertRec(root.right, data);
            
        return root;
    }
}

This demonstrates object-oriented programming and recursive algorithms in Java.`
      };
      
      setResponse(responses[selectedLanguage as keyof typeof responses] || "Generated response based on your prompt and selected language.");
      setIsProcessing(false);
    }, 2000);
  };

  const modelStats = {
    parameters: "7.2B",
    training: "Educational Content",
    accuracy: "94.7%",
    languages: "12+",
    uptime: "99.9%"
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header 
          title="Local LLM Model" 
          description="Interact with your custom AI tutoring model" 
        />
        
        <main className="p-8">
          <Tabs defaultValue="interact" className="w-full">
            <TabsList className="grid w-full grid-cols-3" data-testid="llm-tabs">
              <TabsTrigger value="interact" data-testid="interact-tab">Model Interaction</TabsTrigger>
              <TabsTrigger value="performance" data-testid="performance-tab">Performance Metrics</TabsTrigger>
              <TabsTrigger value="configuration" data-testid="config-tab">Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="interact" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Panel */}
                <Card data-testid="input-panel">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                      Model Input
                    </h3>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Programming Language</label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger data-testid="language-selector">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="go">Go</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Your Prompt</label>
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask me to explain a concept, generate code, or help with a programming problem..."
                        rows={6}
                        className="code-font"
                        data-testid="prompt-input"
                      />
                    </div>

                    <Button 
                      onClick={handleGenerateResponse}
                      disabled={isProcessing || !prompt.trim()}
                      className="w-full"
                      data-testid="generate-btn"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {isProcessing ? "Processing..." : "Generate Response"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Output Panel */}
                <Card data-testid="output-panel">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Code className="w-5 h-5 mr-2 text-secondary" />
                      Model Response
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="bg-muted rounded-lg p-4 min-h-[300px] max-h-[400px] custom-scrollbar overflow-y-auto">
                      {isProcessing ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      ) : response ? (
                        <pre className="text-sm code-font whitespace-pre-wrap text-foreground" data-testid="response-content">
                          {response}
                        </pre>
                      ) : (
                        <p className="text-muted-foreground text-center">
                          Enter a prompt above and click "Generate Response" to see the AI model's output
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Model Status */}
              <Card className="mt-8" data-testid="model-status">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <BrainCircuit className="w-5 h-5 mr-2 text-accent" />
                    Model Status & Information
                  </h3>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Cpu className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Parameters</p>
                      <p className="text-lg font-semibold text-foreground" data-testid="param-count">{modelStats.parameters}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Database className="w-6 h-6 text-secondary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Training Data</p>
                      <p className="text-lg font-semibold text-foreground">{modelStats.training}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <BarChart3 className="w-6 h-6 text-success" />
                      </div>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-lg font-semibold text-foreground">{modelStats.accuracy}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="text-lg font-semibold text-foreground">{modelStats.languages}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Activity className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                      <p className="text-lg font-semibold text-foreground">{modelStats.uptime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card data-testid="response-time">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-primary" />
                      Response Time
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average</span>
                        <span className="text-sm font-medium">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fastest</span>
                        <span className="text-sm font-medium">0.8s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">95th Percentile</span>
                        <span className="text-sm font-medium">2.1s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="accuracy-metrics">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-success" />
                      Accuracy Metrics
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Code Generation</span>
                        <Badge variant="secondary">96.2%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Concept Explanation</span>
                        <Badge variant="secondary">94.8%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Problem Solving</span>
                        <Badge variant="secondary">92.5%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="mt-8">
              <Card data-testid="model-config">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-muted-foreground" />
                    Model Configuration
                  </h3>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Response Length</label>
                      <Select defaultValue="medium">
                        <SelectTrigger data-testid="response-length">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                          <SelectItem value="medium">Medium (1-2 paragraphs)</SelectItem>
                          <SelectItem value="long">Long (Detailed explanation)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Code Examples</label>
                      <Select defaultValue="always">
                        <SelectTrigger data-testid="code-examples">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always include</SelectItem>
                          <SelectItem value="relevant">Only when relevant</SelectItem>
                          <SelectItem value="never">Never include</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Difficulty Level</label>
                      <Select defaultValue="adaptive">
                        <SelectTrigger data-testid="difficulty-level">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner-friendly</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="adaptive">Adaptive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Model Information</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Local AI model trained specifically for educational content</p>
                        <p>• No external API dependencies or internet connection required</p>
                        <p>• Optimized for programming concepts and code generation</p>
                        <p>• Privacy-focused: All processing happens locally</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}