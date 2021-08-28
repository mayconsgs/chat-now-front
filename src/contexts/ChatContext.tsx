import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import { UserProps } from "./AuthContext";

export interface ViewProps {
  visualizedAt: string;
}

export interface MessageProps {
  id: string;
  text: string;
  sendedAt: string;

  user: UserProps;
  views: ViewProps[];
}

export interface ChatProps {
  isGroup: boolean;
  title: string;
  description: string;
  shareCode: string;

  users: UserProps[];
  messages: MessageProps[];
}

interface ChatContextData {
  chats: ChatProps[];
  opennedChat?: ChatProps;
  openChatId?: string;
  setOpenChatId: (id: string) => void;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextData>({
  chats: [],
  setOpenChatId: (id) => {},
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chats, setChats] = useState([]);
  const [openChatId, setOpenChatId] = useState<string>();
  const [opennedChat, setopenedChat] = useState<ChatProps>();

  useEffect(() => {
    api.get("/chats").then(({ data }) => {
      setChats(data);
    });
  }, []);

  useEffect(() => {
    if (openChatId)
      api.get(`/chats/${openChatId}`).then(({ data }) => {
        setopenedChat(data);
      });
  }, [openChatId]);

  return (
    <ChatContext.Provider
      value={{ chats, opennedChat, openChatId, setOpenChatId }}
    >
      {children}
    </ChatContext.Provider>
  );
};
