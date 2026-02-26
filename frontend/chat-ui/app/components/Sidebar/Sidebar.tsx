"use client";

import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import styles from "./Sidebar.module.css";

interface Props {
  openSettings: () => void;
  setDeleteId: (id: string) => void;
}

export default function Sidebar({
  openSettings,
  setDeleteId
}: Props) {
  const {
    conversations,
    activeId,
    createNewChat,
    renameChat,
    setActiveId
  } = useChat();

  const [editingId, setEditingId] =
    useState<string | null>(null);
  const [tempTitle, setTempTitle] =
    useState("");

  return (
    <div className={styles.sidebar}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <h3>AI Platform</h3>
        <button onClick={openSettings}>
          ⚙
        </button>
      </div>

      {/* New Chat */}
      <button
        className={styles.newChatBtn}
        onClick={createNewChat}
      >
        ➕ New Chat
      </button>

      {/* Conversation List */}
      <div className={styles.conversationList}>
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={`${styles.conversationItem} ${
              conv.id === activeId
                ? styles.active
                : ""
            }`}
            onClick={() =>
              setActiveId(conv.id)
            }
          >
            {editingId === conv.id ? (
              <input
                autoFocus
                className={styles.renameInput}
                value={tempTitle}
                onChange={e =>
                  setTempTitle(
                    e.target.value
                  )
                }
                onBlur={() => {
                  if (tempTitle.trim()) {
                    renameChat(
                      conv.id,
                      tempTitle
                    );
                  }
                  setEditingId(null);
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    if (tempTitle.trim()) {
                      renameChat(
                        conv.id,
                        tempTitle
                      );
                    }
                    setEditingId(null);
                  }
                }}
              />
            ) : (
              <div className={styles.conversationRow}>
                <span>
                  {conv.title}
                </span>

                <div
                  className={styles.actions}
                >
                  {/* Edit */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setEditingId(
                        conv.id
                      );
                      setTempTitle(
                        conv.title
                      );
                    }}
                  >
                    ✏
                  </button>

                  {/* Delete */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setDeleteId(
                        conv.id
                      );
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
