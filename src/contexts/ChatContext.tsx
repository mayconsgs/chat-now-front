import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import { UserProps } from "./AuthContext";

interface ViewProps {
  visualizedAt: string;
}

interface MessageProps {
  id: string;
  text: string;
  sendedAt: string;

  user: UserProps;
  views: ViewProps[];
}

interface ChatProps {
  isGroup: boolean;
  title: string;
  description: string;
  shareCode: string;

  users: UserProps[];
  messages: MessageProps[];
}

interface ChatContextData {
  chats: ChatProps[];
  openChat?: object;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextData>({ chats: [] });

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    api.get("/chats").then(({ data }) => {
      setChats(data);
    });
  }, []);

  return (
    <ChatContext.Provider value={{ chats, openChat: undefined }}>
      {children}
    </ChatContext.Provider>
  );
};
