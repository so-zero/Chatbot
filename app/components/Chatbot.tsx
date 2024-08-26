"use client";

import React from "react";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon, SparklesIcon } from "lucide-react";

const Chatbot = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="flex flex-col w-full max-w-[670px] h-[80vh] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex items-start gap-3">
                <div className="p-2 border border-gray-700 rounded-full">
                  <SparklesIcon
                    className="size-5 text-primary"
                    fill="currentColor"
                  />
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm text-muted-foreground">
                    {message.content}
                  </p>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm text-primary-foreground">
                    {message.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="메세지를 입력하세요."
            className="rounded-lg border-none focus:ring-0 pr-12 min-h-[64px]"
            rows={2}
            value={input}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input}
            className="absolute bottom-3 right-3 rounded-full"
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">전송</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
