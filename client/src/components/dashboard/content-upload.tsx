import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Youtube, FileText, Globe, Plus, UploadCloud } from "lucide-react";

const mockUserId = "user-1";

export default function ContentUpload() {
  const [contentType, setContentType] = useState<"youtube" | "pdf" | "website">("youtube");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("POST", "/api/custom-content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", mockUserId, "custom-content"] });
      toast({
        title: "Content uploaded successfully",
        description: "Your content is being processed and will be available shortly.",
      });
      setUrl("");
      setFile(null);
    },
    onError: () => {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("userId", mockUserId);
    formData.append("type", contentType);
    
    if (contentType === "pdf" && file) {
      formData.append("file", file);
      formData.append("title", file.name);
    } else if (contentType !== "pdf" && url) {
      formData.append("url", url);
      formData.append("title", url);
    } else {
      toast({
        title: "Missing information",
        description: "Please provide the required content.",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(formData);
  };

  return (
    <Card className="p-6 mb-8" data-testid="content-upload">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <UploadCloud className="w-5 h-5 mr-2 text-accent" />
        Train Your Custom AI Tutor
      </h2>
      <p className="text-muted-foreground mb-6">
        Upload your learning materials to enhance your AI tutor's knowledge base
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
          onClick={() => setContentType("youtube")}
          data-testid="upload-youtube"
        >
          <Youtube className="w-8 h-8 mx-auto mb-3 text-red-500" />
          <h3 className="font-medium text-foreground mb-2">YouTube Videos</h3>
          <p className="text-sm text-muted-foreground">Paste YouTube links for video content</p>
        </div>
        <div 
          className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
          onClick={() => setContentType("pdf")}
          data-testid="upload-pdf"
        >
          <FileText className="w-8 h-8 mx-auto mb-3 text-accent" />
          <h3 className="font-medium text-foreground mb-2">PDF Documents</h3>
          <p className="text-sm text-muted-foreground">Upload programming books & guides</p>
        </div>
        <div 
          className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
          onClick={() => setContentType("website")}
          data-testid="upload-website"
        >
          <Globe className="w-8 h-8 mx-auto mb-3 text-secondary" />
          <h3 className="font-medium text-foreground mb-2">Websites</h3>
          <p className="text-sm text-muted-foreground">Add documentation & tutorial sites</p>
        </div>
      </div>
      
      {/* Upload Form */}
      <div className="bg-muted rounded-lg p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <Select value={contentType} onValueChange={(value: "youtube" | "pdf" | "website") => setContentType(value)}>
            <SelectTrigger className="w-40" data-testid="content-type-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">YouTube Link</SelectItem>
              <SelectItem value="pdf">PDF Upload</SelectItem>
              <SelectItem value="website">Website URL</SelectItem>
            </SelectContent>
          </Select>
          
          {contentType === "pdf" ? (
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex-1"
              data-testid="file-input"
            />
          ) : (
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={contentType === "youtube" ? "Enter YouTube URL..." : "Enter website URL..."}
              className="flex-1"
              data-testid="url-input"
            />
          )}
          
          <Button 
            type="submit" 
            disabled={uploadMutation.isPending || (contentType === "pdf" ? !file : !url)}
            data-testid="add-content"
          >
            <Plus className="w-4 h-4 mr-1" />
            {uploadMutation.isPending ? "Processing..." : "Add Content"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
