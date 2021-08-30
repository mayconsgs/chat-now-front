import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { FC, Fragment, useContext } from "react";
import { ChatContext, ChatProps } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";

interface ChatListItemProps {
  chat: ChatProps;
  next?: ChatProps;
}

const ChatListItem: FC<ChatListItemProps> = ({ chat, next }) => {
  const lastMessage =
    chat.messages[0]?.text || "Seja o primeiro a mandar uma mensagem";
  const styles = chatStyle();
  const { onOpenChat: setOpenChatId } = useContext(ChatContext);
  const { openChatId } = useContext(ChatContext);

  return (
    <Fragment>
      {/* <Badge
        classes={{ anchorOriginTopRightRectangle: styles.badgeCenter }}
        color="secondary"
        max={99}
        badgeContent={1}
      > */}
      <ListItem
        button
        selected={openChatId === chat.shareCode}
        onClick={() => setOpenChatId(chat.shareCode)}
      >
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: styles.breakText,
            secondary: styles.breakText,
          }}
          primary={chat.title}
          secondary={lastMessage}
        />
      </ListItem>
      {/* </Badge> */}
      {next && <Divider />}
    </Fragment>
  );
};

export default ChatListItem;