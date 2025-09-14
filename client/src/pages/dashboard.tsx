import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ProgressCards from "@/components/dashboard/progress-cards";
import LearningPath from "@/components/dashboard/learning-path";
import AIChat from "@/components/dashboard/ai-chat";
import MemoryVisualization from "@/components/dashboard/memory-visualization";
import ContentUpload from "@/components/dashboard/content-upload";
import ActivityFeed from "@/components/dashboard/activity-feed";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header 
          title="Dashboard" 
          description="Continue your personalized learning journey" 
        />
        
        <main className="p-8">
          <ProgressCards />
          <LearningPath />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AIChat />
            <MemoryVisualization />
          </div>
          
          <ContentUpload />
          <ActivityFeed />
        </main>
      </div>
    </div>
  );
}
