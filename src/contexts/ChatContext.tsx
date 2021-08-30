import { Component, createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
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
  onOpenChat: (id: string) => void;
  socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextData>({
  chats: [],
  onOpenChat: (id) => {},
});

interface ChatProviderState {
  chatsList: ChatProps[];
  openChatId?: string;
  opennedChat?: ChatProps;
}

export class ChatProvider extends Component<{}, ChatProviderState> {
  socket = io(process.env.REACT_APP_API_URL!);

  constructor(props: ChatProviderProps) {
    super(props);

    this.state = {
      chatsList: [],
    };
  }

  componentDidMount() {
    api.get("/chats").then(({ data }) => {
      this.setState({
        chatsList: data,
      });

      this.socket.emit(
        "chatList",
        this.state.chatsList.map((e: ChatProps) => e.shareCode)
      );
    });

    this.socket.on("newMessage", (chatId: string, message: MessageProps) => {
      const chat = this.state.chatsList.find((e) => e.shareCode === chatId);
      if (!chat) return;
      const newChats = this.state.chatsList.filter(
        (e) => e.shareCode !== chatId
      );

      chat.messages[0] = message;

      this.setState({
        chatsList: [chat].concat(newChats || []),
      });
    });
  }

  render() {
    return (
      <ChatContext.Provider
        value={{
          chats: this.state.chatsList,
          openChatId: this.state.openChatId,
          opennedChat: this.state.opennedChat,
          socket: this.socket,

          // Essa parte ficou feia, eu sei, em breve pretendo melhorar
          onOpenChat: (id: string) => {
            this.setState({
              openChatId: id,
            });

            api.get(`/chats/${id}`).then(({ data }) => {
              this.setState({ opennedChat: data });
            });
          },
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}
