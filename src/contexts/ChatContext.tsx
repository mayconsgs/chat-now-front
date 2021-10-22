import { cloneDeep } from "lodash";
import { Component, createContext } from "react";
import { io, Socket } from "socket.io-client";
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
  socket?: Socket;
  messagesCount: number;
  hasNext: boolean;
  loadMore?: () => void;
  onOpenChat: (id: string) => void;
}

interface ChatProviderProps {}
interface ChatProviderState {
  chatsList: ChatProps[];
  openChatId?: string;
  opennedChat?: ChatProps;
  page: number;
  messagesCount: number;
  hasNext: boolean;
}

interface PaginateResponseData {
  data: MessageProps[];
  next_page_url: string | null;
  total: number;
}

export const ChatContext = createContext<ChatContextData>({
  chats: [],
  onOpenChat: (id) => {},
  hasNext: false,
  messagesCount: 0,
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
      page: 0,
      messagesCount: 0,
      hasNext: false,
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

      if (chatId !== this.state.openChatId) {
        this.setState({ chatsList: [chat, ...newChats] });
        return;
      }

      let scrollAfter = false;
      const element = document.getElementsByClassName("messages-display")[0];

      if (element?.scrollHeight === (element?.scrollTop || 0) + 592)
        scrollAfter = true;

      this.setState((state) => {
        const opennedChat = cloneDeep(state.opennedChat);
        opennedChat?.messages.push(message);

        return {
          opennedChat,
          chatsList: [chat, ...newChats],
          messagesCount: state.messagesCount + 1,
        };
      });

      if (scrollAfter) {
        element?.scroll({
          top: (element?.scrollHeight || 0) - 592,
          behavior: "smooth",
        });
      }
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
          hasNext: this.state.hasNext,
          messagesCount: this.state.messagesCount,
          onOpenChat: async (id) => {
            if (id === this.state.openChatId) return;

            try {
              const [chatResponse, messagesResponse] = await Promise.all([
                api.get(`/chats/${id}`),
                api.get(`/chats/${id}/messages`),
              ]);

              const {
                data: messages,
                next_page_url,
                total: messagesCount,
              } = messagesResponse.data as PaginateResponseData;
              const opennedChat = {
                ...chatResponse.data,
                messages,
              } as ChatProps;

              opennedChat.messages.sort(
                (a, b) =>
                  Number(new Date(a.sendedAt)) - Number(new Date(b.sendedAt))
              );

              this.setState({
                opennedChat,
                openChatId: id,
                messagesCount,
                hasNext: Boolean(next_page_url),
              });

              const element =
                document.getElementsByClassName("messages-display")[0];
              element?.scroll({
                top: (element?.scrollHeight || 0) - 592,
              });
            } catch (error) {}
          },
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}
