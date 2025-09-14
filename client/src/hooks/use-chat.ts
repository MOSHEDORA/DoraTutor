import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@/types";

interface ChatResponse {
  message: string;
  codeExamples?: {
    language: string;
    code: string;
    explanation: string;
  }[];
  concepts?: string[];
}

export function useChat(userId: string) {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  // Fetch chat messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/chat-messages", userId],
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/ai-tutor/chat", {
        userId,
        message,
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ["/api/chat-messages", userId] });
      setInput("");
    },
  });

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || input;
    if (messageToSend.trim()) {
      sendMessage.mutate(messageToSend);
    }
  };

  return {
    messages: messages as ChatMessage[],
    input,
    setInput,
    sendMessage: handleSendMessage,
    isLoading: isLoading || sendMessage.isPending,
  };
}
