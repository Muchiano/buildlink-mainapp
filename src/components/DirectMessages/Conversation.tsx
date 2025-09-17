
import React, { useEffect, useRef, useState } from "react";
import { directMessagesService } from "@/services/directMessagesService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ConversationProps {
  otherUserId: string;
  otherUserName?: string;
  onBack: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ otherUserId, otherUserName, onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await directMessagesService.getMessages(user.id, otherUserId);
      if (error) {
        toast({ title: "Failed to load messages", description: error.message, variant: "destructive" });
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    };
    fetchMessages();
    // Optionally: set up polling or real-time
  }, [user, otherUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async () => {
    if (!user || !content.trim()) return;
    const { data, error } = await directMessagesService.sendMessage({
      sender_id: user.id,
      recipient_id: otherUserId,
      content,
    });
    if (error) {
      toast({ title: "Failed to send message", description: error.message, variant: "destructive" });
    } else {
      setMessages((msgs) => [...msgs, data]);
      setContent("");
    }
  };

  return (
    <div className="flex flex-col bg-white h-[60vh] rounded-xl border shadow max-w-2xl mx-auto relative">
      <div className="p-3 border-b flex items-center gap-2">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <div className="font-bold">{otherUserName || "Conversation"}</div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl px-3 py-2 shadow-sm ${msg.sender_id === user.id ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
      <div className="p-3 border-t flex gap-2">
        <Textarea
          value={content}
          placeholder="Type your message..."
          className="w-full resize-none"
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        />
        <Button onClick={handleSend} disabled={!content.trim()}>Send</Button>
      </div>
    </div>
  );
};

export default Conversation;

