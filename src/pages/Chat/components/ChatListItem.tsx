import {
  Avatar,
  Badge,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { FC, Fragment, useContext } from "react";
import { ChatContext, ChatProps } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";

interface ChatListItemProps {
  chat: ChatProps;
  hasNext: boolean;
}

const ChatListItem: FC<ChatListItemProps> = ({ chat, hasNext }) => {
  const lastMessage =
    chat.messages[0]?.text || "Seja o primeiro a mandar uma mensagem";
  const styles = chatStyle();
  const { onOpenChat: setOpenChatId } = useContext(ChatContext);
  const { openedChatId: openChatId } = useContext(ChatContext);

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
        <ListItemSecondaryAction>
          <Badge color="secondary" max={99} badgeContent={100} />
        </ListItemSecondaryAction>
      </ListItem>
      {/* </Badge> */}
      {hasNext && <Divider />}
    </Fragment>
  );
};

export default ChatListItem;
