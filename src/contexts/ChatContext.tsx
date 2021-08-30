import { Component, createContext } from "react";
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
  openedChat?: ChatProps;
  openedChatId?: string;
  onOpenChat: (id: string) => void;
  socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
}

interface ChatProviderProps {}
interface ChatProviderState {
  chatsList: ChatProps[];
  openChatId?: string;
  opennedChat?: ChatProps;
}

export const ChatContext = createContext<ChatContextData>({
  chats: [],
  onOpenChat: (id) => {},
});

export class ChatProvider extends Component<
  ChatProviderProps,
  ChatProviderState
> {
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
        chatsList: [chat, ...newChats],
      });

      if (chatId !== this.state.openChatId) return;

      this.setState((state) => {
        const opennedChat = JSON.parse(
          JSON.stringify(state.opennedChat)
        ) as ChatProps;

        opennedChat.messages.push(message);

        return {
          opennedChat,
        };
      });
    });
  }

  render() {
    return (
      <ChatContext.Provider
        value={{
          chats: this.state.chatsList,
          openedChatId: this.state.openChatId,
          openedChat: this.state.opennedChat,
          socket: this.socket,

          // Essa parte ficou feia, eu sei, em breve pretendo melhorar
          onOpenChat: (id) => {
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
