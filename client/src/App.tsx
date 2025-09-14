import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import AITutor from "@/pages/ai-tutor";
import LearningPaths from "@/pages/learning-paths";
import Visualizations from "@/pages/visualizations";
import LLMModel from "@/pages/llm-model";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/ai-tutor" component={AITutor} />
      <Route path="/learning-paths" component={LearningPaths} />
      <Route path="/visualizations" component={Visualizations} />
      <Route path="/llm-model" component={LLMModel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
