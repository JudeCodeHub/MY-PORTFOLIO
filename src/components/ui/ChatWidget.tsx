"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChatBotIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const MAX_HISTORY_MESSAGES = 20;

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-orange-500/70"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function ChatMessage({ role, content }: Message) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap wrap-break-word",
          isUser
            ? "bg-orange-500 text-white rounded-2xl rounded-br-sm"
            : "bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white/85 rounded-2xl rounded-bl-sm",
        )}
      >
        {content}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = messageListRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        fabRef.current &&
        !fabRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isStreaming) return;

    setError(null);
    setInput("");

    const nextMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: text },
    ].slice(-MAX_HISTORY_MESSAGES);
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Something went wrong. Please try again.");
        setMessages(nextMessages);
        setIsStreaming(false);
        return;
      }

      if (!res.body) {
        setError("Something went wrong. Please try again.");
        setMessages(nextMessages);
        setIsStreaming(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setMessages(nextMessages);
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <button
        ref={fabRef}
        onClick={() => setIsOpen((v) => !v)}
        suppressHydrationWarning
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-6 right-6 md:bottom-20 md:right-22 z-60 w-14 h-14 rounded-full flex items-center justify-center",
          "bg-slate-200/80 dark:bg-[#111] border border-orange-500/40 text-orange-500",
          "shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300",
          "hover:bg-orange-500 hover:text-white hover:border-orange-500",
          "hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95",
          "pb-[env(safe-area-inset-bottom)]",
        )}
      >
        <HugeiconsIcon icon={ChatBotIcon} size={26} strokeWidth={1.5} />
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                  "fixed z-70 flex flex-col overflow-hidden shadow-2xl",
                  "bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/10 origin-bottom-right",
                  "bottom-24 left-4 right-4 h-[60dvh] max-h-[70dvh] rounded-2xl",
                  "md:bottom-38 md:left-auto md:right-22 md:w-150 md:h-140 md:max-h-[70vh]",
                )}
              >
                <div className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#141414]">
                  <div className="flex flex-col leading-tight font-mono min-w-0">
                    <span className="text-sm text-slate-800 dark:text-white/85 truncate">
                      <span className="text-orange-500">~$</span> ask-about-jude.ai
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-white/40 truncate">
                      AI assistant, answering on Jude&apos;s behalf
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                  >
                    <X size={18} className="text-slate-600 dark:text-white/60" />
                  </button>
                </div>

                <div
                  ref={messageListRef}
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 [scrollbar-width:thin] [scrollbar-color:rgba(249,115,22,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-orange-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-orange-500/70"
                >
                  {messages.length === 0 && (
                    <p className="text-sm text-slate-400 dark:text-white/40 font-mono text-center mt-6">
                      <span className="text-orange-500">~$</span> ask me anything about
                      Jude&apos;s background, skills, or projects
                    </p>
                  )}
                  {messages.map((m, i) =>
                    m.role === "assistant" && m.content === "" && isStreaming && i === messages.length - 1 ? (
                      <div key={i} className="flex justify-start">
                        <div className="bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 rounded-2xl rounded-bl-sm">
                          <TypingIndicator />
                        </div>
                      </div>
                    ) : (
                      <ChatMessage key={i} role={m.role} content={m.content} />
                    ),
                  )}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-md px-3 py-2">
                      {error}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="shrink-0 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#141414] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      rows={1}
                      disabled={isStreaming}
                      className="flex-1 resize-none max-h-24 bg-white dark:bg-[#0c0c0c] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-white/90 placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isStreaming || !input.trim()}
                      aria-label="Send message"
                      className="w-9 h-9 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center transition-all hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
