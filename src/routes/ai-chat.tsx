import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { MobileShell } from "@/components/MobileShell";
import { aiSuggestions, aiResponses } from "@/data/nykaa";
import { ChevronLeft, Send, Bot, User as UserIcon, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Shopping Assistant — Nykaa" },
      { name: "description", content: "Personalized beauty recommendations, store help, and loyalty tips powered by AI." },
    ],
  }),
  component: AiChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

function pickResponse(input: string): string {
  const lc = input.toLowerCase();
  if (lc.includes("oily") || lc.includes("dry") || lc.includes("recommend")) return aiResponses.oily;
  if (lc.includes("store") || lc.includes("nearest") || lc.includes("location")) return aiResponses.store;
  if (lc.includes("point") || lc.includes("loyalty") || lc.includes("earn")) return aiResponses.points;
  if (lc.includes("tester") || lc.includes("sample") || lc.includes("try")) return aiResponses.tester;
  if (lc.includes("shade") || lc.includes("foundation") || lc.includes("color") || lc.includes("colour")) return aiResponses.shade;
  return "I can help with product picks, store navigation, loyalty points, tester kits, and shade matching. Try one of the suggestions below or ask me anything!";
}

function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: aiResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: pickResponse(text) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <MobileShell showHeader={false} hideAiButton>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold leading-tight">Nykaa AI Assistant</p>
          <p className="text-[10px] text-success leading-tight">● Online · Get 20% OFF</p>
        </div>
        <Sparkles className="w-4 h-4 text-primary" />
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-44">
        {messages.map((m, i) => (
          <Bubble key={i} message={m} />
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <Dot delay="0ms" /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-background border-t border-border z-30">
        <div className="px-3 pt-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {aiSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex-shrink-0 text-[11px] bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-semibold whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about beauty…"
            className="flex-1 bg-muted border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </MobileShell>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
        }`}
      >
        {isUser ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border text-foreground rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
