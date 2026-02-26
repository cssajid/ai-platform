"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../context/ChatContext";
import styles from "./ChatArea.module.css";

export default function ChatArea() {
  const {
    conversations,
    activeId,
    input,
    loading,
    setInput,
    sendMessage,
    stopGenerating
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConversation = conversations.find(
    c => c.id === activeId
  );

  /* =============================
     AUTO SCROLL TO BOTTOM
  ============================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [activeConversation?.messages]);

  /* =============================
     AUTO RESIZE TEXTAREA
  ============================= */
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height =
      textarea.scrollHeight + "px";
  };

  return (
    <div className={styles.chatArea}>
      {/* =============================
           MESSAGE AREA
      ============================= */}
      <div className={styles.messages}>
        {activeConversation?.messages.map(
          (msg, index) => (
            <div
              key={index}
              className={`${styles.messageRow} ${
                msg.role === "user"
                  ? styles.userRow
                  : styles.assistantRow
              }`}
            >
              {/* Assistant Avatar (Left) */}
              {msg.role === "assistant" && (
                <div className={styles.avatar}>
                  AI
                </div>
              )}

              {/* Message Bubble */}
              <div className={styles.bubble}>
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>

              {/* User Avatar (Right) */}
              {msg.role === "user" && (
                <div className={styles.avatar}>
                  U
                </div>
              )}
            </div>
          )
        )}
{/* Typing Indicator */}
{loading && (
  <div className={`${styles.messageRow} ${styles.assistantRow}`}>
    <div className={styles.avatar}>AI</div>
    <div className={styles.typingBubble}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)}
        <div ref={bottomRef} />
      </div>

      {/* =============================
           INPUT AREA
      ============================= */}
      {activeConversation && (
        <div className={styles.inputArea}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={input}
            placeholder="Type your message..."
            onChange={e => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={e => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                if (!loading && input.trim()) {
                  sendMessage();
                }
              }
            }}
          />

          <button
            className={styles.sendButton}
            onClick={
              loading
                ? stopGenerating
                : sendMessage
            }
            disabled={!input.trim() && !loading}
          >
            {loading ? "Stop" : "Send"}
          </button>
        </div>
      )}
    </div>
  );
}
