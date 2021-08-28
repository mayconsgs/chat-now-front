import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { useContext } from "react";
import { FC, Fragment } from "react";
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
  const { setOpenChatId } = useContext(ChatContext);

  return (
    <Fragment>
      {/* <Badge
        classes={{ anchorOriginTopRightRectangle: styles.badgeCenter }}
        color="secondary"
        max={99}
        badgeContent={1}
      > */}
      <ListItem button onClick={() => setOpenChatId(chat.shareCode)}>
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
