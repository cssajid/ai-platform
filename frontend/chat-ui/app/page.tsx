"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatArea from "./components/ChatArea/ChatArea";
import SettingsModal from "./components/SettingModel/SettingsModal";
import DeleteModal from "./components/DeleteModel/DeleteModal";
import { useChat } from "./context/ChatContext";

export default function ChatPage() {
  // ✅ Extract everything ONCE at top level
  const {
    model,
    setModel,
    deleteChat
  } = useChat();

  const [showSettings, setShowSettings] =
    useState(false);
  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  return (
    <div className="layout">
      {/* =============================
           SIDEBAR
      ============================= */}
      <Sidebar
        openSettings={() =>
          setShowSettings(true)
        }
        setDeleteId={setDeleteId}
      />

      {/* =============================
           CHAT AREA
      ============================= */}
      <ChatArea />

      {/* =============================
           SETTINGS MODAL
      ============================= */}
      {showSettings && (
        <SettingsModal
          currentModel={model}
          onSave={(selectedModel) => {
            setModel(selectedModel);
            setShowSettings(false);
          }}
          onClose={() =>
            setShowSettings(false)
          }
        />
      )}

      {/* =============================
           DELETE MODAL
      ============================= */}
      {deleteId && (
        <DeleteModal
          onConfirm={() => {
            deleteChat(deleteId);
            setDeleteId(null);
          }}
          onCancel={() =>
            setDeleteId(null)
          }
        />
      )}
    </div>
  );
}
