import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import api from "../services/api";
import { AuthContext, UserProps } from "./AuthContext";

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
  chatListSocket?: Socket<DefaultEventsMap, DefaultEventsMap>;
  chatSocket?: Socket<DefaultEventsMap, DefaultEventsMap>;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextData>({
  chats: [],
  setOpenChatId: (id) => {},
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [openChatId, setOpenChatId] = useState<string>();
  const [opennedChat, setopenedChat] = useState<ChatProps>();

  const [chatListSocket, setChatListSocket] = useState(
    io(`${process.env.REACT_APP_API_URL}/${user?.id}`)
  );
  const [chatSocket, setChatSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    api.get("/chats").then(({ data }) => {
      setChats(data);
    });
  }, []);

  useEffect(() => {
    if (!openChatId) return;

    api.get(`/chats/${openChatId}`).then(({ data }) => {
      setopenedChat(data);
    });

    setChatSocket(io(`${process.env.REACT_APP_API_URL}/${openChatId}`));
  }, [openChatId]);

  chatListSocket.on("updateList", () => {
    api.get("/chats").then(({ data }) => {
      setChats(data);
    });
  });

  return (
    <ChatContext.Provider
      value={{ chats, opennedChat, openChatId, setOpenChatId }}
    >
      {children}
    </ChatContext.Provider>
  );
};
