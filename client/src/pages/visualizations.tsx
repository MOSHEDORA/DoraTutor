import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import MemoryCanvas from "@/components/visualizations/memory-canvas";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, BarChart3, GitBranch, Database } from "lucide-react";

export default function Visualizations() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header 
          title="Interactive Visualizations" 
          description="Explore programming concepts through animated visualizations" 
        />
        
        <main className="p-8">
          <Tabs defaultValue="memory" className="w-full">
            <TabsList className="grid w-full grid-cols-4" data-testid="visualization-tabs">
              <TabsTrigger value="memory" data-testid="memory-tab">Memory Management</TabsTrigger>
              <TabsTrigger value="sorting" data-testid="sorting-tab">Sorting Algorithms</TabsTrigger>
              <TabsTrigger value="trees" data-testid="trees-tab">Data Structures</TabsTrigger>
              <TabsTrigger value="graphs" data-testid="graphs-tab">Graph Algorithms</TabsTrigger>
            </TabsList>

            <TabsContent value="memory" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card data-testid="memory-visualization-card">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Stack vs Heap Memory Allocation
                      </h3>
                      <MemoryCanvas />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card data-testid="memory-explanation">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-3">Understanding Memory</h4>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-4 h-4 bg-accent rounded mr-2"></div>
                            <strong>Stack Memory</strong>
                          </div>
                          <p>Stores local variables and function call information. Memory is automatically managed and freed when functions return.</p>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-4 h-4 bg-secondary rounded mr-2"></div>
                            <strong>Heap Memory</strong>
                          </div>
                          <p>Used for dynamic memory allocation. Objects created here persist until explicitly freed or garbage collected.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card data-testid="code-example">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-3">Code Example</h4>
                      <pre className="bg-muted p-4 rounded text-sm code-font overflow-x-auto">
                        <code>{`def example_function():
    # Stack: local variables
    x = 10
    y = "hello"
    
    # Heap: dynamic objects
    my_list = [1, 2, 3, 4, 5]
    my_dict = {"key": "value"}
    
    return my_list`}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sorting" className="mt-8">
              <Card data-testid="sorting-placeholder">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sorting Algorithms</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive visualizations for bubble sort, quicksort, merge sort, and more.
                  </p>
                  <Button data-testid="coming-soon-sorting">Coming Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trees" className="mt-8">
              <Card data-testid="trees-placeholder">
                <CardContent className="p-12 text-center">
                  <GitBranch className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Data Structures</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore binary trees, heaps, linked lists, and other data structures.
                  </p>
                  <Button data-testid="coming-soon-trees">Coming Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graphs" className="mt-8">
              <Card data-testid="graphs-placeholder">
                <CardContent className="p-12 text-center">
                  <Database className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Graph Algorithms</h3>
                  <p className="text-muted-foreground mb-4">
                    Visualize graph traversal, shortest path, and network algorithms.
                  </p>
                  <Button data-testid="coming-soon-graphs">Coming Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
