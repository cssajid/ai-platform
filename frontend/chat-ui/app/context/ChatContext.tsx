"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Conversation, Message } from "../types/chat";
import modelsConfig from "../../config/models.json";

interface ChatContextType {
  conversations: Conversation[];
  activeId: string | null;
  input: string;
  loading: boolean;
  model: string;

  setActiveId: (id: string) => void;
  setInput: (value: string) => void;
  createNewChat: () => void;
  renameChat: (id: string, title: string) => void;
  deleteChat: (id: string) => void;
  sendMessage: () => void;
  stopGenerating: () => void;
  setModel: (model: string) => void;
}

const ChatContext =
  createContext<ChatContextType | null>(null);

export function ChatProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);
  const [activeId, setActiveId] =
    useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(
    modelsConfig[0].id
  );

  const controllerRef =
    useRef<AbortController | null>(null);

  const activeConversation = conversations.find(
    c => c.id === activeId
  );

  /* =============================
     LOAD LOCAL STORAGE
  ============================= */
  useEffect(() => {
    const saved =
      localStorage.getItem("ai_conversations");
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
      if (parsed.length > 0)
        setActiveId(parsed[0].id);
    }

    const savedModel =
      localStorage.getItem("selected_model");
    if (savedModel) setModel(savedModel);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ai_conversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("selected_model", model);
  }, [model]);

  /* =============================
     CHAT ACTIONS
  ============================= */

  const createNewChat = () => {
    const newChat: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: []
    };

    setConversations(prev => [newChat, ...prev]);
    setActiveId(newChat.id);
  };

  const renameChat = (
    id: string,
    title: string
  ) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === id ? { ...c, title } : c
      )
    );
  };

  const deleteChat = (id: string) => {
    const updated = conversations.filter(
      c => c.id !== id
    );

    setConversations(updated);

    if (activeId === id) {
      setActiveId(
        updated.length ? updated[0].id : null
      );
    }
  };

  const stopGenerating = () => {
    controllerRef.current?.abort();
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeId) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setInput("");
    setLoading(true);

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                userMessage
              ]
            }
          : conv
      )
    );

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            messages: [
              ...(activeConversation?.messages ||
                []),
              userMessage
            ],
            model
          }),
          signal: controller.signal
        }
      );

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeId
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    role: "assistant",
                    content: "",
                    timestamp:
                      new Date().toLocaleTimeString()
                  }
                ]
              }
            : conv
        )
      );

      while (true) {
        const { done, value } =
          await reader.read();
        if (done) break;

        assistantText +=
          decoder.decode(value);

        setConversations(prev =>
          prev.map(conv => {
            if (conv.id !== activeId)
              return conv;

            const updated = [
              ...conv.messages
            ];
            updated[
              updated.length - 1
            ].content = assistantText;

            return {
              ...conv,
              messages: updated
            };
          })
        );
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeId,
        input,
        loading,
        model,
        setActiveId,
        setInput,
        createNewChat,
        renameChat,
        deleteChat,
        sendMessage,
        stopGenerating,
        setModel
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "useChat must be used within ChatProvider"
    );
  }
  return context;
}
